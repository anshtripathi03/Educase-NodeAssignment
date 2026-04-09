'use strict';

const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

const timestamp = () => new Date().toISOString();

const logger = {
  error: (msg, meta = '') => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.error)
      console.error(`[${timestamp()}] [ERROR] ${msg}`, meta);
  },
  warn: (msg, meta = '') => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.warn)
      console.warn(`[${timestamp()}] [WARN]  ${msg}`, meta);
  },
  info: (msg, meta = '') => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.info)
      console.log(`[${timestamp()}] [INFO]  ${msg}`, meta);
  },
  debug: (msg, meta = '') => {
    if (LOG_LEVELS[currentLevel] >= LOG_LEVELS.debug)
      console.log(`[${timestamp()}] [DEBUG] ${msg}`, meta);
  },
};

module.exports = logger;
