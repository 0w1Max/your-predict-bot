const pool = require('./db');
const logger = require('./logger');

const getRandomPrediction = async () => {
  try {
    const res = await pool.query('SELECT text FROM predictions ORDER BY RANDOM() LIMIT 1');
    return res.rows[0]?.text || 'В базе нет предсказаний!';
  } catch (err) {
    logger.error(`Ошибка при получении предсказания: ${err.message}`);
    return 'Ошибка при получении предсказания!';
  }
};

const addPrediction = async (text) => {
  try {
    await pool.query('INSERT INTO predictions (text) VALUES ($1)', [text]);
    return true;
  } catch (err) {
    logger.error(`Ошибка при добавлении предсказания: ${err.message}`);
    return false;
  }
};

module.exports = { getRandomPrediction, addPrediction };
