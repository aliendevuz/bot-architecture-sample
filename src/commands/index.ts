import { Telegraf } from 'telegraf';
import { CustomContext } from '../types/context';
import { startCommand } from './start';
import { helpCommand } from './help';
import { aboutCommand } from './about';
import { statsCommand } from './admin/stats';
import { broadcastCommand } from './admin/broadcast';
import { adminOnlyMiddleware } from '../bot/middleware';

/**
 * Barcha komandalarni ro'yxatdan o'tkazish
 */
export const registerCommands = (bot: Telegraf<CustomContext>) => {
  // Asosiy komandalar
  bot.command('start', startCommand);
  bot.command('help', helpCommand);
  bot.command('about', aboutCommand);
  
  // Admin komandalar (middleware bilan himoyalangan)
  bot.command('stats', adminOnlyMiddleware, statsCommand);
  bot.command('broadcast', adminOnlyMiddleware, broadcastCommand);
  
  // Bot komandalar ro'yxatini o'rnatish (Telegram UI uchun)
  bot.telegram.setMyCommands([
    { command: 'start', description: 'Botni boshlash' },
    { command: 'help', description: 'Yordam' },
    { command: 'about', description: 'Bot haqida' },
  ]);
};