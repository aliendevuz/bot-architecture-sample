import { CustomContext } from '../../types/context';

/**
 * Bot statistikasi (oddiy namuna)
 */
const botStats = {
  startTime: Date.now(),
  totalUsers: 0,
  totalMessages: 0,
  totalCommands: 0,
};

/**
 * /stats komanda - Admin uchun statistika
 */
export const statsCommand = async (ctx: CustomContext) => {
  // Botning ishlash vaqti
  const uptime = Date.now() - botStats.startTime;
  const hours = Math.floor(uptime / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  
  const statsMessage = `
📊 *Bot Statistikasi*

⏱ *Ishlash vaqti:* ${hours}s ${minutes}d

👥 *Foydalanuvchilar:* ${botStats.totalUsers}
💬 *Xabarlar:* ${botStats.totalMessages}
🔧 *Komandalar:* ${botStats.totalCommands}

📈 *Tizim ma'lumotlari:*
• Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime: ${(process.uptime() / 60).toFixed(2)} daqiqa
• Node versiya: ${process.version}
  `.trim();
  
  await ctx.replyWithMarkdown(statsMessage);
};

/**
 * Statistikani yangilash funksiyalari
 */
export const incrementUsers = () => botStats.totalUsers++;
export const incrementMessages = () => botStats.totalMessages++;
export const incrementCommands = () => botStats.totalCommands++;