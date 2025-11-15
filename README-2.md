# 🤖 Telegram Bot - Professional TypeScript Arxitektura

Professional darajadagi Telegram bot namunasi TypeScript va Telegraf kutubxonasi asosida.

## 📋 Mundarija

- [Xususiyatlar](#xususiyatlar)
- [Arxitektura](#arxitektura)
- [O'rnatish](#ornatish)
- [Ishga Tushirish](#ishga-tushirish)
- [Loyiha Tuzilishi](#loyiha-tuzilishi)
- [Yangi Funksiya Qo'shish](#yangi-funksiya-qoshish)
- [Best Practices](#best-practices)
- [FAQ](#faq)

## ✨ Xususiyatlar

- ✅ **TypeScript** - To'liq type safety
- ✅ **ES Modules** - Zamonaviy JavaScript standartlari
- ✅ **Middleware Pattern** - Kengaytirilishi oson arxitektura
- ✅ **Custom Context** - Qulaylik metodlari
- ✅ **Error Handling** - Global xatolarni tutish
- ✅ **Rate Limiting** - Spam'dan himoya
- ✅ **Logging System** - Batafsil loglar
- ✅ **Admin Panel** - Admin komandalar
- ✅ **Keyboard Builders** - Oson keyboard yaratish
- ✅ **Webhook Support** - Production uchun tayyor

## 🏗️ Arxitektura

Bu bot **Layered Architecture** printsipiga asoslangan:

```
Presentation Layer (Commands/Handlers)
           ↓
   Business Logic (Services)
           ↓
    Utility Layer (Utils)
```

### Asosiy Komponentlar:

1. **Bot Layer** - Bot konfiguratsiyasi va middleware'lar
2. **Commands** - Bot komandalar
3. **Handlers** - Event handler'lar
4. **Services** - Business logic
5. **Utils** - Yordamchi funksiyalar
6. **Types** - TypeScript type'lar
7. **Config** - Konfiguratsiya

## 🚀 O'rnatish

### Talablar

- Node.js >= 18.0.0
- npm yoki yarn

### 1. Repository'ni clone qiling

```bash
git clone <repository-url>
cd telegram-bot-sample
```

### 2. Dependencies'ni o'rnating

```bash
npm install
```

### 3. Environment o'zgaruvchilarni sozlang

```bash
cp .env.example .env
```

`.env` faylini tahrirlang:

```env
BOT_TOKEN=your_bot_token_here
NODE_ENV=development
ADMIN_IDS=123456789,987654321
```

**Bot token olish:**
1. [@BotFather](https://t.me/BotFather) ga boring
2. `/newbot` komanda yuboring
3. Bot nomi va username'ni kiriting
4. Token'ni oling va `.env` ga qo'shing

## 🎯 Ishga Tushirish

### Development rejimi

```bash
npm run dev
```

Bu rejim kod o'zgarishlarini avtomatik kuzatadi (hot reload).

### Production build

```bash
npm run build
npm start
```

### Linting va formatting

```bash
npm run lint
npm run format
```

## 📁 Loyiha Tuzilishi

```
src/
├── index.ts              # Entry point
├── bot/
│   ├── bot.ts           # Bot instance
│   └── middleware/      # Middleware'lar
├── commands/            # Bot komandalar
│   ├── start.ts
│   ├── help.ts
│   └── admin/          # Admin komandalar
├── handlers/            # Event handler'lar
│   ├── text.ts
│   └── callback.ts
├── services/            # Business logic
├── utils/               # Yordamchi funksiyalar
│   ├── logger.ts
│   └── keyboards.ts
├── types/               # TypeScript types
│   └── context.ts
└── config/              # Konfiguratsiya
    └── env.ts
```

## 📝 Yangi Funksiya Qo'shish

### 1. Yangi Komanda Qo'shish

**Qadam 1:** `src/commands/` da yangi fayl yarating:

```typescript
// src/commands/mycommand.ts
import { CustomContext } from '../types/context';

export const myCommand = async (ctx: CustomContext) => {
  await ctx.reply('Salom!');
};
```

**Qadam 2:** `src/commands/index.ts` da ro'yxatdan o'tkazing:

```typescript
import { myCommand } from './mycommand';

export const registerCommands = (bot: Telegraf<CustomContext>) => {
  // ...
  bot.command('mycommand', myCommand);
};
```

### 2. Yangi Middleware Qo'shish

**Qadam 1:** `src/bot/middleware/` da middleware yarating:

```typescript
// src/bot/middleware/my-middleware.ts
import { CustomContext } from '../../types/context';

export const myMiddleware = async (
  ctx: CustomContext,
  next: () => Promise<void>
) => {
  // Middleware logikasi
  console.log('Before handler');
  
  await next();
  
  console.log('After handler');
};
```

**Qadam 2:** `src/bot/bot.ts` da ulang:

```typescript
import { myMiddleware } from './middleware/my-middleware';

bot.use(myMiddleware);
```

### 3. Yangi Service Qo'shish

**Qadam 1:** `src/services/` da service yarating:

```typescript
// src/services/user.service.ts
export class UserService {
  async getUser(userId: number) {
    // Database'dan user olish
    return { id: userId, name: 'User' };
  }
  
  async saveUser(userData: unknown) {
    // User'ni saqlash
  }
}

export const userService = new UserService();
```

**Qadam 2:** Command yoki handler'da ishlating:

```typescript
import { userService } from '../services/user.service';

export const profileCommand = async (ctx: CustomContext) => {
  const user = await userService.getUser(ctx.userId);
  await ctx.reply(`Salom, ${user.name}!`);
};
```

### 4. Yangi Keyboard Qo'shish

`src/utils/keyboards.ts` ga qo'shing:

```typescript
export const createMyKeyboard = () => {
  return Markup.keyboard([
    ['Button 1', 'Button 2'],
    ['Button 3'],
  ]).resize();
};
```

## 🎨 Keyboard Namunalar

### Reply Keyboard

```typescript
const keyboard = Markup.keyboard([
  ['Tugma 1', 'Tugma 2'],
  ['Tugma 3'],
]).resize();

await ctx.reply('Tanlang:', keyboard);
```

### Inline Keyboard

```typescript
const keyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Like', 'like'),
    Markup.button.callback('Dislike', 'dislike'),
  ],
  [Markup.button.url('Website', 'https://example.com')],
]);

await ctx.reply('Tanlang:', keyboard);
```

### Keyboard'ni olib tashlash

```typescript
await ctx.reply('Text', Markup.removeKeyboard());
```

## 🔧 Middleware'lar

Bot ushbu middleware'lardan foydalanadi:

1. **errorHandler** - Global xatolarni tutish
2. **loggerMiddleware** - Barcha requestlarni log qilish
3. **authMiddleware** - Ban qilingan userlarni bloklash
4. **rateLimitMiddleware** - Spam'dan himoya

### Middleware Tartibi

```
Request → Error Handler → Logger → Auth → Rate Limit → Handler
```

## 📊 Admin Komandalar

Admin komandalar faqat `.env` dagi `ADMIN_IDS` ro'yxatidagi userlar uchun:

- `/stats` - Bot statistikasi
- `/broadcast` - Barcha foydalanuvchilarga xabar yuborish

## 🛡️ Best Practices

### 1. Context'dan foydalanish

```typescript
// ✅ Yaxshi
const userId = ctx.userId;
const isAdmin = ctx.isAdmin;
await ctx.replyWithSuccess('OK!');

// ❌ Yomon
const userId = ctx.from?.id || 0;
await ctx.reply('✅ OK!');
```

### 2. Error Handling

```typescript
// ✅ Yaxshi
try {
  await someAsyncOperation();
} catch (error) {
  logger.error('Operation failed', error);
  await ctx.replyWithError('Xatolik yuz berdi');
}

// ❌ Yomon
await someAsyncOperation(); // Xatolarni ignore qiladi
```

### 3. Logging

```typescript
// ✅ Yaxshi
logger.info('User started bot', { userId: ctx.userId });
logger.error('Failed to send message', error);

// ❌ Yomon
console.log('User started bot');
```

### 4. Keyboard'lar

```typescript
// ✅ Yaxshi
import { createMainKeyboard } from './utils/keyboards';
await ctx.reply('Text', createMainKeyboard());

// ❌ Yomon
await ctx.reply('Text', {
  reply_markup: {
    keyboard: [['Button']],
    resize_keyboard: true,
  },
});
```

## 🗃️ Database Qo'shish

Bu namunada database yo'q, lekin qo'shish oson:

1. Database kutubxonasini o'rnating (Prisma, TypeORM, MongoDB, etc.)
2. `src/database/` papkasini yarating
3. Model'lar va repository'larni qo'shing
4. Service'larda database'dan foydalaning

**Namuna (Prisma bilan):**

```typescript
// src/database/prisma.ts
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// src/services/user.service.ts
import { prisma } from '../database/prisma';

export class UserService {
  async getUser(userId: number) {
    return prisma.user.findUnique({
      where: { telegramId: userId },
    });
  }
}
```

## 🚀 Production Deploy

### 1. Environment'ni sozlang

```env
NODE_ENV=production
WEBHOOK_DOMAIN=https://yourdomain.com
WEBHOOK_PORT=443
```

### 2. Build qiling

```bash
npm run build
```

### 3. Serverni ishga tushiring

```bash
npm start
```

### 4. PM2 bilan (tavsiya etiladi)

```bash
npm install -g pm2
pm2 start dist/index.mjs --name telegram-bot
pm2 save
```

## ❓ FAQ

### Bot javob bermayapti?

1. Bot token to'g'ri ekanligini tekshiring
2. Log'larni ko'ring: `npm run dev`
3. Internet aloqangizni tekshiring
4. Telegram API status: https://status.telegram.org/

### Webhook qanday sozlanadi?

1. `.env` da `WEBHOOK_DOMAIN` ni sozlang
2. SSL sertifikatiga ega bo'lish kerak
3. `NODE_ENV=production` qilib ishga tushiring

### Admin komandalar ishlamayapti?

1. `.env` da `ADMIN_IDS` ni to'g'ri kiriting
2. User ID'ni [@userinfobot](https://t.me/userinfobot) dan oling
3. Bot'ni qaytadan ishga tushiring

### TypeScript error'lar?

```bash
npm run build
```

Agar error bo'lsa, `tsconfig.json` ni tekshiring.

## 📚 Resurslar

- [Telegraf Documentation](https://telegraf.js.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 📄 License

MIT

## 🤝 Contributing

Pull request'lar qabul qilinadi!

---

**Savol yoki muammolar?** [Issue oching](https://github.com/yourrepo/issues)