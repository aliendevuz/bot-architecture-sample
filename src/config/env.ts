import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment o'zgaruvchilarini tekshirish va export qilish
 */
export const config = {
  // Bot token (majburiy)
  botToken: process.env.BOT_TOKEN || '',
  
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Webhook settings
  webhook: {
    domain: process.env.WEBHOOK_DOMAIN || '',
    port: parseInt(process.env.WEBHOOK_PORT || '3000', 10),
  },
  
  // Admin user ID'lari
  adminIds: process.env.ADMIN_IDS 
    ? process.env.ADMIN_IDS.split(',').map(id => parseInt(id.trim(), 10))
    : [],
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Database (agar kerak bo'lsa)
  databaseUrl: process.env.DATABASE_URL || '',
} as const;

/**
 * Majburiy o'zgaruvchilarni tekshirish
 */
export const validateConfig = (): void => {
  if (!config.botToken) {
    throw new Error('BOT_TOKEN is required in .env file');
  }
  
  if (config.isProduction && !config.webhook.domain) {
    console.warn('WEBHOOK_DOMAIN is not set, using polling mode');
  }
  
  if (config.adminIds.length === 0) {
    console.warn('ADMIN_IDS is not set, admin commands will not work');
  }
};