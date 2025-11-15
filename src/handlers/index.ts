import { Telegraf } from 'telegraf';
import { CustomContext } from '../types/context';
import { textHandler } from './text';
import { callbackHandler } from './callback';

/**
 * Barcha handler'larni ro'yxatdan o'tkazish
 */
export const registerHandlers = (bot: Telegraf<CustomContext>) => {
  // Text xabarlar
  bot.on('text', textHandler);
  
  // Callback query (inline button bosish)
  bot.on('callback_query', callbackHandler);
  
  // Photo
  bot.on('photo', async (ctx) => {
    await ctx.reply('Rasm qabul qilindi! 📷');
  });
  
  // Document
  bot.on('document', async (ctx) => {
    await ctx.reply('Fayl qabul qilindi! 📄');
  });
  
  // Sticker
  bot.on('sticker', async (ctx) => {
    await ctx.reply('Ajoyib sticker! 😊');
  });
  
  // Voice
  bot.on('voice', async (ctx) => {
    await ctx.reply('Ovozli xabar qabul qilindi! 🎤');
  });
  
  // Video
  bot.on('video', async (ctx) => {
    await ctx.reply('Video qabul qilindi! 🎥');
  });
  
  // Location
  bot.on('location', async (ctx) => {
    const { latitude, longitude } = ctx.message.location;
    await ctx.reply(`Joylashuv qabul qilindi!\n📍 Lat: ${latitude}, Lon: ${longitude}`);
  });
  
  // Contact
  bot.on('contact', async (ctx) => {
    await ctx.reply('Kontakt qabul qilindi! 📞');
  });
};