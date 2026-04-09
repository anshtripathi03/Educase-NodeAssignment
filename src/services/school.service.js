'use strict';

const SchoolModel = require('../models/school.model');
const { calculateDistance } = require('../utils/haversine');
const logger = require('../utils/logger');

const SchoolService = {
  /**
   * Creates a new school after verifying inputs are structurally valid
   * (field-level validation is already done upstream in the middleware).
   *
   * @param {{ name: string, address: string, latitude: number, longitude: number }} data
   * @returns {Promise<{ id: number }>}
   */
  async addSchool(data) {
    logger.info(`SchoolService.addSchool — name="${data.name}"`);
    const { id } = await SchoolModel.create(data);
    logger.info(`SchoolService.addSchool — inserted id=${id}`);
    return { id };
  },

  /**
   * Fetches all schools, calculates their distance from the given coordinates,
   * sorts ascending, and returns a paginated slice.
   *
   * @param {object} params
   * @param {number} params.latitude
   * @param {number} params.longitude
   * @param {number} params.page   - 1-based page number
   * @param {number} params.limit  - results per page
   * @returns {Promise<{ schools: Array, meta: object }>}
   */
  async listSchools({ latitude, longitude, page, limit }) {
    logger.info(`SchoolService.listSchools — lat=${latitude} lon=${longitude} page=${page} limit=${limit}`);

    const allSchools = await SchoolModel.findAll();
    const withDistance = allSchools.map((school) => ({
      ...school,
      distance_km: calculateDistance(latitude, longitude, school.latitude, school.longitude),
    }));

    // Sort nearest-first
    withDistance.sort((a, b) => a.distance_km - b.distance_km);

    // Pagination
    const total = withDistance.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedSchools = withDistance.slice(offset, offset + limit);

    const meta = {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return { schools: paginatedSchools, meta };
  },
};

module.exports = SchoolService;
