const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('./logger');

const dbPath = path.join(__dirname, '../data/predictions.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('❌ Ошибка подключения к базе данных:', err.message);
  } else {
    logger.info('✅ Подключено к базе SQLite');
    db.run(`CREATE TABLE IF NOT EXISTS predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    )`);
  }
});

module.exports = db;
