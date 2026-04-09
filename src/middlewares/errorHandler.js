'use strict';

const logger = require('../utils/logger');

const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  if (status >= 500) {
    logger.error(`[${req.method}] ${req.originalUrl} — ${err.message}`, err.stack);
  } else {
    logger.warn(`[${req.method}] ${req.originalUrl} — ${err.message}`);
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'A record with this data already exists.',
    });
  }

  if (err.code === 'ER_NO_SUCH_TABLE') {
    return res.status(500).json({
      success: false,
      message: 'Database table not found. Please run the schema migration.',
    });
  }

  return res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    // Only expose stack trace outside production
    ...(isProduction ? {} : { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
