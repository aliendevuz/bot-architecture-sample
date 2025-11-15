import { CustomContext } from '../../types/context';
import { logger } from '../../utils/logger';

/**
 * Global error handler middleware
 */
export const errorHandler = async (ctx: CustomContext, next: () => Promise<void>) => {
  try {
    await next();
  } catch (error) {
    // Xatoni log qilish
    logger.error('Unhandled error in bot', {
      error,
      userId: ctx.userId,
      chatId: ctx.chatId,
      updateType: ctx.updateType,
    });
    
    // Foydalanuvchiga xabar yuborish
    try {
      await ctx.replyWithError(
        'Kechirasiz, xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring yoki admin bilan bog\'laning.'
      );
    } catch (replyError) {
      logger.error('Failed to send error message to user', replyError);
    }
  }
};