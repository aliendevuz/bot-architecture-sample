import { CustomContext } from '../../types/context';
import { logger } from '../../utils/logger';

/**
 * Rate limit ma'lumotlarini saqlash
 */
interface RateLimitData {
  count: number;
  resetTime: number;
}

const userRateLimits = new Map<number, RateLimitData>();

/**
 * Rate limiting konfiguratsiyasi
 */
const RATE_LIMIT_CONFIG = {
  maxRequests: 20,        // Maksimal requestlar soni
  windowMs: 60 * 1000,    // Vaqt oynasi (1 daqiqa)
  blockDurationMs: 5 * 60 * 1000, // Block davomiyligi (5 daqiqa)
};

/**
 * Rate limiting middleware
 * Spam'dan himoya qilish
 */
export const rateLimitMiddleware = async (ctx: CustomContext, next: () => Promise<void>) => {
  const userId = ctx.from?.id;
  
  if (!userId) {
    await next();
    return;
  }
  
  // Admin'larni o'tkazib yuborish
  if (ctx.isAdmin) {
    await next();
    return;
  }
  
  const now = Date.now();
  const userLimit = userRateLimits.get(userId);
  
  // Birinchi request yoki reset vaqti o'tgan
  if (!userLimit || now > userLimit.resetTime) {
    userRateLimits.set(userId, {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    });
    await next();
    return;
  }
  
  // Limit tekshirish
  if (userLimit.count >= RATE_LIMIT_CONFIG.maxRequests) {
    // Block qilish
    userLimit.resetTime = now + RATE_LIMIT_CONFIG.blockDurationMs;
    
    logger.warn(`Rate limit exceeded by user ${userId}`);
    await ctx.replyWithError(
      `⏳ Siz juda ko'p xabar yubordingiz. Iltimos, ${Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 60000)} daqiqadan keyin qaytadan urinib ko'ring.`
    );
    return;
  }
  
  // Count'ni oshirish
  userLimit.count++;
  userRateLimits.set(userId, userLimit);
  
  await next();
};

/**
 * Eski limitlarni tozalash (xotira uchun)
 * Har 10 daqiqada ishga tushadi
 */
setInterval(() => {
  const now = Date.now();
  const usersToDelete: number[] = [];
  
  userRateLimits.forEach((data, userId) => {
    if (now > data.resetTime) {
      usersToDelete.push(userId);
    }
  });
  
  usersToDelete.forEach(userId => userRateLimits.delete(userId));
  
  if (usersToDelete.length > 0) {
    logger.debug(`Cleaned up ${usersToDelete.length} expired rate limits`);
  }
}, 10 * 60 * 1000);