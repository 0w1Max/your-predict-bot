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

pool.query(`
  CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL
  );
`).catch(err => logger.error('❌ Ошибка создания таблицы:', err));

module.exports = pool;
