import log4js from 'log4js';

log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'log/app.log', backups: 0 },
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['file', 'console'], level: 'debug' }
  }
});

const logger = log4js.getLogger();

export default logger;