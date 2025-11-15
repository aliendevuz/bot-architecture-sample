import { Telegraf } from 'telegraf';
import { CustomContext, enhanceContext } from '../types/context';
import { config } from '../config/env';
import {
  errorHandler,
  loggerMiddleware,
  authMiddleware,
  rateLimitMiddleware,
} from './middleware';

/**
 * Bot instanceni yaratish
 */
export const createBot = (): Telegraf<CustomContext> => {
  const bot = new Telegraf<CustomContext>(config.botToken);
  
  // Context'ni kengaytirish
  bot.use((ctx, next) => {
    const enhanced = enhanceContext(ctx);
    Object.assign(ctx, enhanced);
    return next();
  });
  
  // Middleware'larni ulash (tartib muhim!)
  bot.use(errorHandler);           // 1. Error handler (eng yuqorida)
  bot.use(loggerMiddleware);        // 2. Logger
  bot.use(authMiddleware);          // 3. Authentication
  bot.use(rateLimitMiddleware);     // 4. Rate limiting
  
  return bot;
};