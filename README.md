# Telegram Bot - Professional Arxitektura

## 📁 Loyiha Tuzilishi

```
telegram-bot-sample/
├── src/                          # Barcha TypeScript kodlar
│   ├── index.ts                  # Bot kirish nuqtasi
│   ├── bot/                      # Bot konfiguratsiyasi
│   │   ├── bot.ts                # Bot instanceni yaratish
│   │   └── middleware/           # Middleware'lar
│   │       ├── index.ts          # Barcha middleware'larni export
│   │       ├── logger.ts         # Logging middleware
│   │       ├── error-handler.ts  # Xatolarni tutish
│   │       ├── auth.ts           # Authentication
│   │       └── rate-limit.ts     # Rate limiting
│   ├── commands/                 # Bot komandalar
│   │   ├── index.ts              # Commandlarni ro'yxatga olish
│   │   ├── start.ts              # /start komanda
│   │   ├── help.ts               # /help komanda
│   │   ├── about.ts              # /about komanda
│   │   └── admin/                # Admin komandalar
│   │       ├── index.ts
│   │       ├── stats.ts          # /stats komanda
│   │       └── broadcast.ts      # /broadcast komanda
│   ├── handlers/                 # Event handler'lar
│   │   ├── index.ts
│   │   ├── text.ts               # Text xabarlarga handler
│   │   ├── callback.ts           # Callback query handler
│   │   ├── inline.ts             # Inline query handler
│   │   └── actions/              # Callback action'lar
│   │       ├── index.ts
│   │       ├── like.ts
│   │       └── subscribe.ts
│   ├── services/                 # Business logic
│   │   ├── user.service.ts       # Foydalanuvchi xizmatlari
│   │   ├── message.service.ts    # Xabar xizmatlari
│   │   └── notification.service.ts
│   ├── utils/                    # Yordamchi funksiyalar
│   │   ├── logger.ts             # Logger utility
│   │   ├── keyboards.ts          # Keyboard builder'lar
│   │   ├── validators.ts         # Input validatsiya
│   │   └── helpers.ts            # Umumiy funksiyalar
│   ├── types/                    # TypeScript type'lar
│   │   ├── index.ts
│   │   ├── context.ts            # Custom Context type
│   │   └── user.ts               # User type'lar
│   ├── config/                   # Konfiguratsiya
│   │   ├── index.ts
│   │   └── env.ts                # Environment o'zgaruvchilar
│   └── database/                 # Database (optional)
│       ├── index.ts
│       ├── models/
│       └── repositories/
├── dist/                         # Compiled JS kodlar
├── scripts/                      # Build scripts
│   └── rename-to-mjs.js
├── .env.example                  # Environment namuna
├── .env                          # Environment o'zgaruvchilar
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Arxitektura Prinsiplari

### 1. **Separation of Concerns (SoC)**
Har bir fayl o'zining vazifasiga javobgar:
- **Commands**: Faqat komandalarni qabul qilish
- **Handlers**: Event'larni qayta ishlash
- **Services**: Business logic
- **Utils**: Qayta ishlatiluvchi funksiyalar

### 2. **Middleware Pattern**
Barcha requestlar middleware zanjiridan o'tadi:
```
Request → Logger → Auth → Rate Limit → Handler → Error Handler
```

### 3. **Custom Context**
Telegraf Context'ni kengaytirish orqali qo'shimcha funksionallik:
```typescript
interface CustomContext extends Context {
  replyWithSuccess(text: string): Promise<Message>;
  replyWithError(text: string): Promise<Message>;
}
```

### 4. **Service Layer**
Business logic alohida service'larga ajratilgan:
- Kodni qayta ishlatish oson
- Test yozish oson
- Bot logikasi va business logika ajratilgan

## 🚀 Ishga Tushirish

### 1. O'rnatish
```bash
npm install
```

### 2. Environment sozlash
```bash
cp .env.example .env
# .env faylini tahrirlang va BOT_TOKEN qo'shing
```

### 3. Development
```bash
npm run dev
```

### 4. Production Build
```bash
npm run build
npm start
```

## 📝 Yangi Komanda Qo'shish

1. `src/commands/` papkasida yangi fayl yarating:
```typescript
// src/commands/mycommand.ts
import { CustomContext } from '../types/context';

export const myCommandHandler = async (ctx: CustomContext) => {
  await ctx.reply('Salom!');
};
```

2. `src/commands/index.ts` da ro'yxatdan o'tkazing:
```typescript
import { myCommandHandler } from './mycommand';

export const registerCommands = (bot: Telegraf<CustomContext>) => {
  bot.command('mycommand', myCommandHandler);
};
```

## 🎯 Yangi Handler Qo'shish

1. `src/handlers/` da handler yarating
2. `src/handlers/index.ts` da export qiling
3. `src/index.ts` da ro'yxatdan o'tkazing

## 🔧 Middleware Qo'shish

1. `src/bot/middleware/` da middleware yarating
2. `src/bot/middleware/index.ts` da export qiling
3. `src/bot/bot.ts` da ulang

## 📊 Asosiy Komandalar

- `/start` - Botni boshlash
- `/help` - Yordam
- `/about` - Bot haqida
- `/stats` - Statistika (admin)
- `/broadcast` - Xabar yuborish (admin)

## 🔐 Authentication

Admin komandalar faqat `ADMIN_IDS` ro'yxatidagi foydalanuvchilar uchun:
```typescript
if (!ctx.isAdmin) {
  return ctx.reply('Sizda ruxsat yo\'q!');
}
```

## 🎨 Keyboard'lar

Inline va Reply keyboard'lar `utils/keyboards.ts` da:
```typescript
import { createMainKeyboard } from './utils/keyboards';
ctx.reply('Tanlang:', createMainKeyboard());
```

## 📚 Qo'shimcha Ma'lumotlar

- [Telegraf Documentation](https://telegraf.js.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Documentation](https://www.typescriptlang.org/)