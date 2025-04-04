const { getRandomPrediction, addPrediction } = require('./predictions');
const logger = require('./logger');

const handleCommands = async (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim();

  // 🔹 Инлайн-клавиатура
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔮 Получить предсказание', callback_data: 'predict' }],
        [{ text: '➕ Добавить предсказание', callback_data: 'add' }],
      ],
    },
  };

  if (text === '/start') {
    bot.sendMessage(
      chatId,
      'Привет! 🔮 Я бот предсказаний. Выберите действие:',
      keyboard
    );
  } 
  else if (text === '/predict') {
    try {
      const prediction = await getRandomPrediction();
      bot.sendMessage(chatId, `🔮 Твоё предсказание: ${prediction}`);
    } catch (err) {
      logger.error(`❌ Ошибка получения предсказания: ${err.message}`);
      bot.sendMessage(chatId, '❌ Произошла ошибка при получении предсказания.');
    }
  } 
  else if (text.startsWith('/add ')) {
    const newPrediction = text.slice(5).trim();
    if (!newPrediction) {
      return bot.sendMessage(chatId, '⚠️ Использование: /add [текст предсказания]');
    }

    try {
      const success = await addPrediction(newPrediction);
      bot.sendMessage(chatId, success ? '✅ Предсказание добавлено!' : '❌ Ошибка при добавлении.');
    } catch (err) {
      logger.error(`❌ Ошибка при добавлении предсказания: ${err.message}`);
      bot.sendMessage(chatId, '❌ Ошибка при добавлении предсказания.');
    }
  }
};

module.exports = { handleCommands };
