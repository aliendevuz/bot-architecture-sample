import { CustomContext } from '../types/context';
import { createMainKeyboard } from '../utils/keyboards';
import { logger } from '../utils/logger';

/**
 * /start komanda handler
 * Bot boshlanganda birinchi ishga tushadi
 */
export const startCommand = async (ctx: CustomContext) => {
  const firstName = ctx.from?.first_name || 'Foydalanuvchi';
  
  logger.info(`User started bot: ${ctx.userId} (@${ctx.username})`);
  
  // Xush kelibsiz xabari
  const welcomeMessage = `
🎉 *Xush kelibsiz, ${firstName}!*

Men Telegram bot namunasiman. Men orqali siz:

✅ Turli komandalardan foydalanishingiz
✅ Inline keyboard'lar bilan ishlashingiz
✅ Text xabarlar yuborishingiz
✅ Va boshqa ko'p narsalarni qilishingiz mumkin!

📚 Yordam uchun /help komandasini yuboring.
  `.trim();
  
//   await ctx.replyWithMarkdown(welcomeMessage, createMainKeyboard()); # TODO: Warning it wants 2 argument
  await ctx.replyWithMarkdown(welcomeMessage);
  
  // Agar admin bo'lsa, qo'shimcha xabar
  if (ctx.isAdmin) {
    await ctx.reply('🔐 Siz admin sifatida tizimga kirdingiz.');
  }
};