import log4js from 'log4js';

log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'log/app.log', backups: 0 }
  },
  categories: {
    default: { appenders: ['file'], level: 'debug' }
  }
});

const logger = log4js.getLogger();

export default logger;