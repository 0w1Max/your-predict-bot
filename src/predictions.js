const db = require('./db');

const getRandomPrediction = (callback) => {
  db.get('SELECT text FROM predictions ORDER BY RANDOM() LIMIT 1', [], (err, row) => {
    if (err) {
      console.error('❌ Ошибка получения предсказания:', err.message);
      callback('Ошибка получения предсказания');
    } else {
      callback(row ? row.text : '❌ В базе нет предсказаний!');
    }
  });
};

const addPrediction = (text, callback) => {
  db.run('INSERT INTO predictions (text) VALUES (?)', [text], function (err) {
    if (err) {
      console.error('❌ Ошибка добавления предсказания:', err.message);
      callback(false);
    } else {
      callback(true);
    }
  });
};

module.exports = { getRandomPrediction, addPrediction };
