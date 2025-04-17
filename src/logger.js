const { createLogger, format, transports } = require('winston');
const path = require('path');

// Формат вывода логов
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Вывод в файл logs/bot.log
    new transports.File({
      filename: path.join(__dirname, '../logs/bot.log'),
      handleExceptions: true
    }),
    // Одновременно вывод в консоль
    new transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false // Не выходить из-за ошибок логгера
});

module.exports = logger;
