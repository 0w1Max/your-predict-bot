const { Pool } = require('pg');
require('dotenv').config();
const logger = require('./logger');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
  logger.info('✅ Подключение к PostgreSQL успешно!');
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        chat_id BIGINT NOT NULL,
        text TEXT NOT NULL
    );
    `);
    logger.info('✅ Таблица predictions проверена/создана.');
  } catch (err) {
    logger.error('❌ Ошибка создания таблицы:', err);
  }
};

initDB();

// Обработчик ошибок соединения с БД
pool.on('error', (err) => {
  logger.error('❌ Ошибка подключения к PostgreSQL:', err);
});

// Корректное завершение работы
process.on('SIGINT', async () => {
  logger.info('⏳ Завершаем соединение с базой данных...');
  await pool.end();
  logger.info('✅ Соединение с БД закрыто.');
  process.exit(0);
});

module.exports = pool;
