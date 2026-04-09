'use strict';

require('dotenv').config();

const createApp = require('./app');
const { connectDB } = require('./config/database');
const logger = require('./utils/logger');

const PORT = parseInt(process.env.PORT, 10) || 3000;

const startServer = async () => {
  try {
    await connectDB();

    const app = createApp();

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
      logger.info(`📚 Health check → http://localhost:${PORT}/health`);
    });

    // Graceful shutdown — release pool and close HTTP server cleanly
    const shutdown = (signal) => {
      logger.info(`\n${signal} received — shutting down gracefully…`);
      server.close(async () => {
        const { pool } = require('./config/database');
        await pool.end();
        logger.info('MySQL pool closed. Goodbye! 👋');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Catch unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled rejection:', reason);
      shutdown('unhandledRejection');
    });
  } catch (err) {
    logger.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
