'use strict';

const SchoolService = require('../services/school.service');
const { sendSuccess, sendError } = require('../utils/response');
const logger = require('../utils/logger');

const SchoolController = {
  async addSchool(req, res, next) {
    try {
      const { name, address, latitude, longitude } = req.body;
      logger.info(`POST /addSchool — "${name}"`);

      const { id } = await SchoolService.addSchool({ name, address, latitude, longitude });

      return sendSuccess(res, {
        message: 'School added successfully',
        data: { id },
        status: 201,
      });
    } catch (err) {
      return next(err);
    }
  },

  async listSchools(req, res, next) {
    try {
      const { latitude, longitude, page, limit } = req.query;
      logger.info(`GET /listSchools — lat=${latitude} lon=${longitude} page=${page} limit=${limit}`);

      const { schools, meta } = await SchoolService.listSchools({
        latitude,
        longitude,
        page,
        limit,
      });

      return sendSuccess(res, {
        message: 'Schools fetched successfully',
        data: schools,
        meta,
      });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = SchoolController;
