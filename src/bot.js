const TelegramBot = require('node-telegram-bot-api');
const { handleCommands } = require('./commands');
const logger = require('./logger');
const db = require('./db');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Установка меню команд
bot.setMyCommands([
  { command: '/predict', description: 'Получить предсказание' },
  { command: '/add', description: 'Добавить новое предсказание' }
]);

bot.on('message', (msg) => {
  logger.info(`\uD83D\uDCE9 Получено сообщение от ${msg.chat.id}: ${msg.text}`);
  handleCommands(bot, msg);
});

logger.info('✅ Бот запущен!');
console.log('✅ Бот запущен!');

process.on('uncaughtException', (err) => {
  logger.error('⚠️ Необработанная ошибка:', err);
});

process.on('unhandledRejection', (reason) => {
  logger.warn('⚠️ Необработанный промис:', reason);
});

process.on('SIGINT', () => {
  logger.info('🛑 Остановка бота...');
  bot.stopPolling();
  db.end(() => {
    logger.info('✅ Соединение с базой закрыто.');
    process.exit(0);
  });
});