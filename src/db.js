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

// Проверка и создание таблицы при запуске
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS predictions (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        chat_id BIGINT
      );
    `);
    logger.info('✅ Таблица predictions проверена/создана.');

    // Проверка существования столбца chat_id
    const res = await pool.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'predictions' AND column_name = 'chat_id';
    `);
    
    if (res.rowCount === 0) {
      await pool.query(`ALTER TABLE predictions ADD COLUMN chat_id BIGINT;`);
      logger.info('✅ Добавлен столбец chat_id в таблицу predictions.');
    }

  } catch (err) {
    logger.error('❌ Ошибка при проверке/создании таблицы:', err);
  }
})();

pool.on('error', (err) => {
  logger.error('❌ Ошибка подключения к PostgreSQL:', err);
});

module.exports = pool;
