import { Markup } from 'telegraf';

/**
 * Asosiy menyu keyboard
 */
export const createMainKeyboard = () => {
  return Markup.keyboard([
    ['📚 Yordam', '📖 Bot haqida'],
    ['⚙️ Sozlamalar', '📊 Statistika'],
  ])
    .resize()
    .persistent();
};

/**
 * Inline keyboard - Tasdiqlov uchun
 */
export const createConfirmKeyboard = (confirmAction: string, cancelAction: string) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('✅ Ha', confirmAction),
      Markup.button.callback('❌ Yo\'q', cancelAction),
    ],
  ]);
};

/**
 * Inline keyboard - Like/Unlike
 */
export const createLikeKeyboard = (itemId: string, liked: boolean = false) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        liked ? '❤️ Yoqdi' : '🤍 Yoqtirish',
        `like:${itemId}`
      ),
    ],
  ]);
};

/**
 * Admin keyboard
 */
export const createAdminKeyboard = () => {
  return Markup.keyboard([
    ['📊 Statistika', '📢 Xabar yuborish'],
    ['👥 Foydalanuvchilar', '⚙️ Sozlamalar'],
    ['◀️ Orqaga'],
  ])
    .resize()
    .persistent();
};

/**
 * Orqaga button
 */
export const createBackKeyboard = (action: string = 'back') => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('◀️ Orqaga', action)],
  ]);
};

/**
 * URL bilan inline keyboard
 */
export const createUrlKeyboard = (text: string, url: string) => {
  return Markup.inlineKeyboard([
    [Markup.button.url(text, url)],
  ]);
};

/**
 * Pagination keyboard
 */
export const createPaginationKeyboard = (
  currentPage: number,
  totalPages: number,
  prefix: string = 'page'
) => {
  const buttons = [];
  
  // Oldingi sahifa
  if (currentPage > 1) {
    buttons.push(
      Markup.button.callback('◀️ Oldingi', `${prefix}:${currentPage - 1}`)
    );
  }
  
  // Sahifa ma'lumoti
  buttons.push(
    Markup.button.callback(`${currentPage}/${totalPages}`, 'current_page')
  );
  
  // Keyingi sahifa
  if (currentPage < totalPages) {
    buttons.push(
      Markup.button.callback('Keyingi ▶️', `${prefix}:${currentPage + 1}`)
    );
  }
  
  return Markup.inlineKeyboard([buttons]);
};

/**
 * Keyboard'ni olib tashlash
 */
export const removeKeyboard = () => {
  return Markup.removeKeyboard();
};

/**
 * Inline keyboard - Ro'yxat tanlash
 */
export const createListKeyboard = (
  items: Array<{ text: string; data: string }>,
  columns: number = 2
) => {
  const buttons = items.map(item => 
    Markup.button.callback(item.text, item.data)
  );
  
  // Buttonlarni ustunlarga bo'lish
  const rows: typeof buttons[] = [];
  for (let i = 0; i < buttons.length; i += columns) {
    rows.push(buttons.slice(i, i + columns));
  }
  
  return Markup.inlineKeyboard(rows);
};