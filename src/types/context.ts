import { Context } from 'telegraf';
import { Message, Update } from 'telegraf/types';
import { config } from '../config/env';

/**
 * Custom Context - Telegraf Context'ni kengaytirish
 * Bu yerda o'z funksiyalaringizni qo'shishingiz mumkin
 */
export interface CustomContext extends Context {
  // User ma'lumotlari
  userId: number;
  chatId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  
  // Admin tekshirish
  isAdmin: boolean;
  
  // Qulaylik metodlari
  replyWithSuccess(text: string): Promise<Message.TextMessage>;
  replyWithError(text: string): Promise<Message.TextMessage>;
  replyWithMarkdown(text: string): Promise<Message.TextMessage>;
  
  // Session (agar kerak bo'lsa)
  session?: {
    lastCommand?: string;
    data?: Record<string, unknown>;
  };
}

/**
 * Context'ga qo'shimcha xususiyatlarni qo'shish
 */
export const enhanceContext = (ctx: Context): CustomContext => {
  const enhanced = ctx as CustomContext;
  
  // User ma'lumotlarini o'rnatish
  enhanced.userId = ctx.from?.id || 0;
  enhanced.chatId = ctx.chat?.id || 0;
  enhanced.username = ctx.from?.username;
  enhanced.firstName = ctx.from?.first_name;
  enhanced.lastName = ctx.from?.last_name;
  
  // Admin ekanligini tekshirish
  enhanced.isAdmin = config.adminIds.includes(enhanced.userId);
  
  // Success xabar yuborish
  enhanced.replyWithSuccess = async (text: string) => {
    return ctx.reply(`✅ ${text}`);
  };
  
  // Error xabar yuborish
  enhanced.replyWithError = async (text: string) => {
    return ctx.reply(`❌ ${text}`);
  };
  
  // Markdown bilan xabar yuborish
  enhanced.replyWithMarkdown = async (text: string) => {
    return ctx.reply(text, { parse_mode: 'Markdown' });
  };
  
  // Session'ni boshlash
  if (!enhanced.session) {
    enhanced.session = {
      lastCommand: undefined,
      data: {},
    };
  }
  
  return enhanced;
};