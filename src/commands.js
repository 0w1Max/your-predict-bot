const { getRandomPrediction, addPrediction } = require('./predictions');

const handleCommands = (bot, msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if (text === '/start') {
    bot.sendMessage(chatId, 'Привет! 🔮 Я бот предсказаний. Напиши /predict, чтобы получить предсказание.');
  } else if (text === '/predict') {
    getRandomPrediction((prediction) => {
      bot.sendMessage(chatId, `🔮 Твоё предсказание: ${prediction}`);
    });
  } else if (text.startsWith('/add ')) {
    const newPrediction = text.slice(5).trim();
    if (newPrediction) {
      addPrediction(newPrediction, (success) => {
        bot.sendMessage(chatId, success ? '✅ Предсказание добавлено!' : '❌ Ошибка при добавлении.');
      });
    } else {
      bot.sendMessage(chatId, '⚠️ Использование: /add [текст предсказания]');
    }
  }
};

module.exports = { handleCommands };
