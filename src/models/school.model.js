'use strict';

const { pool } = require('../config/database');
const logger = require('../utils/logger');

const SchoolModel = {
  /**
   * Inserts a new school record.
   * @param {{ name: string, address: string, latitude: number, longitude: number }} data
   * @returns {Promise<{ id: number, affectedRows: number }>}
   */
  async create({ name, address, latitude, longitude }) {
    const sql = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;
    logger.debug('SchoolModel.create', { name, address, latitude, longitude });
    const [result] = await pool.execute(sql, [name, address, latitude, longitude]);
    return { id: result.insertId, affectedRows: result.affectedRows };
  },

  /**
   * @returns {Promise<Array>}
   */
  async findAll() {
    const sql = 'SELECT id, name, address, latitude, longitude FROM schools';
    logger.debug('SchoolModel.findAll');
    const [rows] = await pool.execute(sql);
    return rows;
  },

  /**
   * Returns the total number of schools. Used for pagination metadata.
   * @returns {Promise<number>}
   */
  async count() {
    const [[{ total }]] = await pool.execute('SELECT COUNT(*) AS total FROM schools');
    return total;
  },
};

module.exports = SchoolModel;
