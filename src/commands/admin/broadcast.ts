import { CustomContext } from '../../types/context';
import { logger } from '../../utils/logger';

/**
 * Broadcast sessiyalarini saqlash
 */
const broadcastSessions = new Map<number, { awaitingMessage: boolean }>();

/**
 * /broadcast komanda - Barcha foydalanuvchilarga xabar yuborish
 */
export const broadcastCommand = async (ctx: CustomContext) => {
  // Session yaratish
  broadcastSessions.set(ctx.userId, { awaitingMessage: true });
  
  await ctx.reply(
    '📢 Broadcast xabarini yuboring.\n\n' +
    'Bu xabar barcha bot foydalanuvchilariga yuboriladi.\n' +
    'Bekor qilish uchun /cancel yuboring.'
  );
};

/**
 * Broadcast xabarini yuborish
 */
export const handleBroadcastMessage = async (ctx: CustomContext, userIds: number[]) => {
  const session = broadcastSessions.get(ctx.userId);
  
  if (!session?.awaitingMessage) {
    return false;
  }
  
  // Session'ni tozalash
  broadcastSessions.delete(ctx.userId);
  
  const message = ctx.message;
  if (!message) {
    await ctx.replyWithError('Xabar topilmadi!');
    return true;
  }
  
  // Xabarni yuborish jarayoni
  await ctx.reply('📤 Xabar yuborilmoqda...');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const userId of userIds) {
    try {
      // Xabarni copy qilish
      await ctx.telegram.copyMessage(userId, ctx.chat!.id, message.message_id);
      successCount++;
    } catch (error) {
      failCount++;
      logger.error(`Failed to send broadcast to user ${userId}`, error);
    }
    
    // Rate limit'dan qochish uchun kichik pauza
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // Natija
  await ctx.replyWithSuccess(
    `Xabar yuborildi!\n\n` +
    `✅ Muvaffaqiyatli: ${successCount}\n` +
    `❌ Muvaffaqiyatsiz: ${failCount}`
  );
  
  logger.info(`Broadcast completed: ${successCount} success, ${failCount} failed`);
  
  return true;
};

/**
 * Broadcast'ni bekor qilish
 */
export const cancelBroadcast = (userId: number): boolean => {
  const session = broadcastSessions.get(userId);
  if (session?.awaitingMessage) {
    broadcastSessions.delete(userId);
    return true;
  }
  return false;
};