// backend/config/logger.js
import log4js from 'log4js';
import dotenv from 'dotenv';

dotenv.config();

const appenders = {};
const categories = {
  default: { appenders: [], level: process.env.LOG_LEVEL || 'info' },
  performance: { appenders: [], level: 'all' } // 🔹 categoria speciale
};

// --- gestione appenders file/console ---
if (process.env.LOG_TO_FILE === 'true') {
  appenders.file = { 
    type: 'file', 
    filename: 'log/app.log', 
    maxLogSize: 10485760, // 10MB
    backups: 5,
    compress: true
  };
  categories.default.appenders.push('file');
  categories.performance.appenders.push('file');
}

if (process.env.LOG_TO_CONSOLE === 'true') {
  appenders.console = { type: 'console' };
  categories.default.appenders.push('console');
  categories.performance.appenders.push('console');
}

log4js.configure({ appenders, categories });

const logger = log4js.getLogger();                // logger normale
const perfLogger = log4js.getLogger('performance'); // 🔹 logger performance

// 🔹 aggiungiamo un metodo custom
logger.performance = (msg) => {
  perfLogger.info(msg); // scrive sempre, anche se LOG_LEVEL è più alto
};

export default logger;
