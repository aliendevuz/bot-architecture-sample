import { config, validateConfig } from './config/env';
import { createBot } from './bot/bot';
import { registerCommands } from './commands';
import { registerHandlers } from './handlers';
import { logger } from './utils/logger';

/**
 * Botni ishga tushirish
 */
const main = async () => {
  try {
    // Konfiguratsiyani tekshirish
    logger.info('Validating configuration...');
    validateConfig();
    
    // Bot instanceni yaratish
    logger.info('Creating bot instance...');
    const bot = createBot();
    
    // Komandalarni ro'yxatdan o'tkazish
    logger.info('Registering commands...');
    registerCommands(bot);
    
    // Handler'larni ro'yxatdan o'tkazish
    logger.info('Registering handlers...');
    registerHandlers(bot);
    
    // Graceful shutdown
    process.once('SIGINT', () => {
      logger.info('Received SIGINT, stopping bot...');
      bot.stop('SIGINT');
    });
    
    process.once('SIGTERM', () => {
      logger.info('Received SIGTERM, stopping bot...');
      bot.stop('SIGTERM');
    });
    
    // Botni ishga tushirish
    if (config.isProduction && config.webhook.domain) {
      // Production: Webhook rejimi
      logger.info(`Starting bot in webhook mode on ${config.webhook.domain}...`);
      
      await bot.launch({
        webhook: {
          domain: config.webhook.domain,
          port: config.webhook.port,
        },
      });
      
      logger.info(`Bot webhook started on ${config.webhook.domain}:${config.webhook.port}`);
    } else {
      // Development: Polling rejimi
      logger.info('Starting bot in polling mode...');
      await bot.launch();
      logger.info('Bot successfully started in polling mode!');
    }
    
    // Bot ma'lumotlarini ko'rsatish
    const botInfo = await bot.telegram.getMe();
    logger.info(`Bot running as @${botInfo.username}`);
    
  } catch (error) {
    logger.error('Failed to start bot', error);
    process.exit(1);
  }
};

// Botni ishga tushirish
main();