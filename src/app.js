'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const createApp = () => {
  const app = express();

  // ── Request logging ──────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  }

  // ── Body parsers ─────────────────────────────────────────────────────────────
  app.use(express.json({ limit: '10kb' }));         // reject oversized payloads
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // ── Security headers (lightweight without helmet dependency) ─────────────────
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // ── Routes ───────────────────────────────────────────────────────────────────
  app.use('/', routes);

  // ── Error handling (must be last) ────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
