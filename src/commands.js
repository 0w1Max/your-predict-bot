const { getRandomPrediction, addPrediction } = require('./predictions');
const logger = require('./logger');

const handleCommands = async (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) return;

  if (text === '/start') {
    bot.sendMessage(chatId, 'Привет! 🔮 Я бот предсказаний. Используй /predict, чтобы получить предсказание.');
  } else if (text === '/predict') {
    const prediction = await getRandomPrediction(chatId);
    bot.sendMessage(chatId, `🔮 Твоё предсказание: ${prediction}`);
  } else if (text.startsWith('/add')) {
    const newPrediction = text.replace('/add', '').trim();
    if (!newPrediction) {
      return bot.sendMessage(chatId, '⚠️ Использование: /add [текст предсказания]');
    }
    const success = await addPrediction(chatId, newPrediction);
    bot.sendMessage(chatId, success ? '✅ Предсказание добавлено!' : '❌ Ошибка при добавлении.');
  } else {
    bot.sendMessage(chatId, '⚠️ Неизвестная команда. Используйте /predict или /add [текст предсказания]');
  }
};

module.exports = { handleCommands };