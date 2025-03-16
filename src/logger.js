const log4js = require('log4js');

log4js.configure({
  appenders: {
    file: { type: 'file', filename: '../logs/bot.log', maxLogSize: 1048576, backups: 3, compress: true },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['file', 'console'], level: 'info' } }
});

const logger = log4js.getLogger();

module.exports = logger;
