const pool = require('./db');
const logger = require('./logger');

const getRandomPrediction = async (chatId) => {
  try {
    const res = await pool.query(
      'SELECT text FROM predictions WHERE chat_id = $1 ORDER BY RANDOM() LIMIT 1', 
      [chatId]
    );
    return res.rows[0]?.text || 'В базе нет предсказаний для этого чата!';
  } catch (err) {
    logger.error(`Ошибка при получении предсказания: ${err.message}`);
    return 'Ошибка при получении предсказания!';
  }
};

const addPrediction = async (chatId, text) => {
  try {
    await pool.query('INSERT INTO predictions (chat_id, text) VALUES ($1, $2)', [chatId, text]);
    return true;
  } catch (err) {
    logger.error(`Ошибка при добавлении предсказания: ${err.message}`);
    return false;
  }
};

module.exports = { getRandomPrediction, addPrediction };
