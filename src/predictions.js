const pool = require('./db');

const getRandomPrediction = async () => {
  const res = await pool.query('SELECT text FROM predictions ORDER BY RANDOM() LIMIT 1');
  return res.rows[0]?.text || 'В базе нет предсказаний!';
};

const addPrediction = async (text) => {
  await pool.query('INSERT INTO predictions (text) VALUES ($1)', [text]);
};

module.exports = { getRandomPrediction, addPrediction };
