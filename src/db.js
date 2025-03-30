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

pool.on('error', (err) => {
  logger.error('❌ Ошибка подключения к PostgreSQL:', err);
});

module.exports = pool;
