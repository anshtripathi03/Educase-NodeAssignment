'use strict';

const mysql = require('mysql2/promise');
const logger = require('../utils/logger');
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_POOL_MAX, 10) || 10,
  ssl: process.env.DB_HOST?.includes("railway")
    ? { rejectUnauthorized: false }
    : undefined,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000,
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    logger.info(` MySQL connected — pool size: ${process.env.DB_POOL_MAX || 10}`);
    connection.release();
  } catch (error) {
    logger.error(` MySQL connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = { pool, connectDB };
