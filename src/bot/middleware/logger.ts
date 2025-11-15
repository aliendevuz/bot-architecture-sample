import { CustomContext } from '../../types/context';
import { logger } from '../../utils/logger';

/**
 * Barcha requestlarni log qilish middleware
 */
export const loggerMiddleware = async (ctx: CustomContext, next: () => Promise<void>) => {
  const start = Date.now();
  
  // Request ma'lumotlari
  const updateType = ctx.updateType;
  const userId = ctx.from?.id;
  const username = ctx.from?.username || 'N/A';
  const chatId = ctx.chat?.id;
  
  // Text yoki komanda
  let content = '';
  if ('text' in ctx.message!) {
    content = ctx.message.text || '';
  } else if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
    content = `callback: ${ctx.callbackQuery.data}`;
  }
  
  logger.info('Incoming request', {
    updateType,
    userId,
    username,
    chatId,
    content: content.substring(0, 100), // Faqat birinchi 100 belgi
  });
  
  try {
    await next();
    
    // Response vaqti
    const responseTime = Date.now() - start;
    logger.debug(`Request processed in ${responseTime}ms`);
  } catch (error) {
    const responseTime = Date.now() - start;
    logger.error(`Request failed after ${responseTime}ms`, error);
    throw error;
  }
};