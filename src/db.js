const { Pool } = require('pg');
require('dotenv').config();
const logger = require('./logger');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  logger.info('✅ Подключение к PostgreSQL успешно!');
});

pool.on('error', (err) => {
  logger.error('❌ Ошибка подключения к PostgreSQL:', err);
});

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL
      );
    `);
    logger.info('✅ Таблица predictions проверена/создана.');
  } catch (err) {
    logger.error('❌ Ошибка создания таблицы:', err);
  }
})();

// Закрытие пула при завершении работы
process.on('SIGINT', async () => {
  logger.info('⏳ Завершение работы, закрытие соединения с БД...');
  await pool.end();
  logger.info('✅ Соединение с PostgreSQL закрыто.');
  process.exit(0);
});

module.exports = pool;
