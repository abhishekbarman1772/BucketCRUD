const log4js = require('log4js');

log4js.configure({
  appenders: {
    Assignment: { type: 'file', filename: './logs/application.log' },
    console: { type: 'stdout' },
  },
  categories: { default: { appenders: ['Assignment', 'console'], level: 'debug' } },
});

const logger = log4js.getLogger('Assignment');
logger.level = 'debug';

module.exports = logger;
