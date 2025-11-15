import { CustomContext } from '../types/context';

/**
 * /help komanda handler
 * Barcha komandalar va yordam ma'lumotlarini ko'rsatish
 */
export const helpCommand = async (ctx: CustomContext) => {
  const helpMessage = `
📚 *Yordam - Mavjud komandalar*

*Asosiy komandalar:*
/start - Botni boshlash
/help - Yordam ko'rsatish
/about - Bot haqida ma'lumot

*Interaktiv funksiyalar:*
• Matn yuboring - Men javob beraman
• Inline tugmalardan foydalaning
• Keyboard orqali tanlang

${ctx.isAdmin ? '\n*Admin komandalar:*\n/stats - Statistikani ko\'rish\n/broadcast - Barcha foydalanuvchilarga xabar yuborish' : ''}

❓ *Qo'shimcha yordam kerakmi?*
Menga har qanday savol bering, men sizga yordam berishga harakat qilaman!
  `.trim();
  
  await ctx.replyWithMarkdown(helpMessage);
};