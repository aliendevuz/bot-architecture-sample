import { CustomContext } from '../types/context';
import { createLikeKeyboard } from '../utils/keyboards';
import { handleBroadcastMessage, cancelBroadcast } from '../commands/admin/broadcast';
import { incrementMessages } from '../commands/admin/stats';

/**
 * Oddiy text xabarlarni qayta ishlash
 */
export const textHandler = async (ctx: CustomContext) => {
  incrementMessages();
  
  const text = ctx.message?.text;
  
  if (!text) {
    return;
  }
  
  // Broadcast xabarini tekshirish
  if (ctx.isAdmin) {
    const isBroadcast = await handleBroadcastMessage(ctx, []); // userIds'ni DB'dan olish kerak
    if (isBroadcast) {
      return;
    }
    
    // Cancel komanda
    if (text === '/cancel') {
      if (cancelBroadcast(ctx.userId)) {
        await ctx.replyWithSuccess('Broadcast bekor qilindi.');
        return;
      }
    }
  }
  
  // Keyboard button'lari
  switch (text) {
    case '📚 Yordam':
      await ctx.reply('Yordam uchun /help komandasini yuboring.');
      break;
      
    case '📖 Bot haqida':
      await ctx.reply('Bot haqida ma\'lumot uchun /about komandasini yuboring.');
      break;
      
    case '⚙️ Sozlamalar':
      await ctx.reply('⚙️ Sozlamalar bo\'limi hozircha ishlab chiqilmoqda...');
      break;
      
    case '📊 Statistika':
      if (ctx.isAdmin) {
        await ctx.reply('Statistika uchun /stats komandasini yuboring.');
      } else {
        await ctx.reply('Bu funksiya faqat adminlar uchun.');
      }
      break;
      
    default:
      // Echo - xabarni qaytarish (demo)
      await handleEchoMessage(ctx, text);
  }
};

/**
 * Echo xabar - foydalanuvchi xabarini qaytarish
 */
const handleEchoMessage = async (ctx: CustomContext, text: string) => {
  // Oddiy javoblar
  const responses = [
    `Siz yozdingiz: "${text}"`,
    `Men sizning xabaringizni oldim: "${text}"`,
    `Rahmat, xabaringiz qabul qilindi: "${text}"`,
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Like button bilan javob
  await ctx.reply(
    randomResponse,
    createLikeKeyboard(`msg_${Date.now()}`, false)
  );
};