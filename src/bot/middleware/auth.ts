import { CustomContext } from '../../types/context';
import { logger } from '../../utils/logger';

/**
 * User ban ro'yxati (oddiy namuna, real botda DB'dan olinadi)
 */
const bannedUsers = new Set<number>([
  // Ban qilingan user ID'lari
]);

/**
 * Authentication middleware
 * Ban qilingan userlarni bloklash
 */
export const authMiddleware = async (ctx: CustomContext, next: () => Promise<void>) => {
  const userId = ctx.from?.id;
  
  if (!userId) {
    logger.warn('Request without user ID');
    return;
  }
  
  // Ban tekshirish
  if (bannedUsers.has(userId)) {
    logger.warn(`Blocked request from banned user: ${userId}`);
    await ctx.reply('Sizning hisobingiz bloklangan. Agar bu xato deb hisoblasangiz, admin bilan bog\'laning.');
    return;
  }
  
  // Davom etish
  await next();
};

/**
 * Admin middleware
 * Faqat adminlar uchun komandalarni himoya qilish
 */
export const adminOnlyMiddleware = async (ctx: CustomContext, next: () => Promise<void>) => {
  if (!ctx.isAdmin) {
    await ctx.replyWithError('Bu komanda faqat adminlar uchun!');
    logger.warn(`Unauthorized admin access attempt by user ${ctx.userId}`);
    return;
  }
  
  await next();
};