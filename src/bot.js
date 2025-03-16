const TelegramBot = require('node-telegram-bot-api');
const { handleCommands } = require('./commands');
const logger = require('./logger');
const db = require('./db');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  logger.info(`Получено сообщение от ${msg.chat.id}: ${msg.text}`);
  handleCommands(bot, msg);
});

logger.info('✅ Бот запущен!');
console.log('✅ Бот запущен!');

// Обработчик ошибок
process.on('uncaughtException', (err) => {
  logger.error('⚠️ Необработанная ошибка:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.warn('⚠️ Необработанный промис:', reason);
});

// Закрываем соединение
process.on('SIGINT', () => {
  logger.info('🛑 Остановка бота...');
  bot.stopPolling();
  db.close(() => {
    logger.info('✅ Соединение с базой закрыто.');
    process.exit(0);
  });
});
