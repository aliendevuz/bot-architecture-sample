import { CustomContext } from '../types/context';
import { createUrlKeyboard } from '../utils/keyboards';

/**
 * /about komanda handler
 * Bot haqida ma'lumot berish
 */
export const aboutCommand = async (ctx: CustomContext) => {
  const aboutMessage = `
ℹ️ *Bot haqida*

*Versiya:* 1.0.0
*Yaratilgan:* TypeScript + Telegraf

*Texnologiyalar:*
• Node.js
• TypeScript
• Telegraf library
• ES Modules

*Xususiyatlar:*
✅ Professional arxitektura
✅ Middleware pattern
✅ Custom Context
✅ Error handling
✅ Rate limiting
✅ Logging system
✅ Admin panel

*Developer:* @YourUsername
  `.trim();
  
  await ctx.replyWithMarkdown(
    aboutMessage,
    createUrlKeyboard('📖 Dokumentatsiya', 'https://telegraf.js.org/')
  );
};