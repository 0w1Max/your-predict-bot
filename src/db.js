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

pool.query(`
  CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    text TEXT NOT NULL
  );
`).catch(err => logger.error('❌ Ошибка создания таблицы:', err));

pool.on('error', (err) => {
  logger.error('❌ Ошибка подключения к PostgreSQL:', err);
});

module.exports = pool;