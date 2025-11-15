import { CustomContext } from '../types/context';
import { createLikeKeyboard } from '../utils/keyboards';
import { logger } from '../utils/logger';

/**
 * Callback query handler
 * Inline keyboard button bosishlarni qayta ishlash
 */
export const callbackHandler = async (ctx: CustomContext) => {
  const callbackData = ctx.callbackQuery?.data;
  
  if (!callbackData) {
    return;
  }
  
  logger.debug(`Callback received: ${callbackData}`);
  
  // Callback data'ni parse qilish (format: "action:param")
  const [action, param] = callbackData.split(':');
  
  try {
    switch (action) {
      case 'like':
        await handleLikeAction(ctx, param);
        break;
        
      case 'confirm':
        await handleConfirmAction(ctx, param);
        break;
        
      case 'cancel':
        await handleCancelAction(ctx);
        break;
        
      case 'page':
        await handlePaginationAction(ctx, param);
        break;
        
      default:
        await ctx.answerCbQuery('Noma\'lum action!');
    }
  } catch (error) {
    logger.error('Error handling callback', error);
    await ctx.answerCbQuery('Xatolik yuz berdi!');
  }
};

/**
 * Like action handler
 */
const handleLikeAction = async (ctx: CustomContext, itemId: string) => {
  // Like holatini almashtirish (DB'da saqlash kerak)
  const isLiked = true; // DB'dan olish kerak
  
  // Answer callback query
  await ctx.answerCbQuery(isLiked ? '❤️ Yoqdi!' : '🤍 Like olib tashlandi');
  
  // Keyboard'ni yangilash
  try {
    await ctx.editMessageReplyMarkup(
      createLikeKeyboard(itemId, isLiked).reply_markup
    );
  } catch (error) {
    // Agar xabar eski bo'lsa, edit ishlamaydi
    logger.debug('Cannot edit message markup', error);
  }
};

/**
 * Confirm action handler
 */
const handleConfirmAction = async (ctx: CustomContext, action: string) => {
  await ctx.answerCbQuery('✅ Tasdiqlandi!');
  
  // Xabarni tahrirlash
  await ctx.editMessageText(`✅ "${action}" tasdiqlandi!`);
};

/**
 * Cancel action handler
 */
const handleCancelAction = async (ctx: CustomContext) => {
  await ctx.answerCbQuery('❌ Bekor qilindi');
  
  // Xabarni o'chirish yoki tahrirlash
  try {
    await ctx.deleteMessage();
  } catch (error) {
    await ctx.editMessageText('❌ Bekor qilindi');
  }
};

/**
 * Pagination action handler
 */
const handlePaginationAction = async (ctx: CustomContext, pageStr: string) => {
  const page = parseInt(pageStr, 10);
  
  await ctx.answerCbQuery(`Sahifa ${page}`);
  
  // Sahifa ma'lumotlarini yuklash va xabarni yangilash
  await ctx.editMessageText(`📄 Sahifa ${page} kontenti`);
};