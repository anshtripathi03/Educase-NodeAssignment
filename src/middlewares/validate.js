'use strict';

const { sendError } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Returns an Express middleware that validates req.body against a Joi schema.
 * @param {import('joi').Schema} schema
 */
const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((d) => ({
      field: d.path.join('.'),
      message: d.message,
    }));
    logger.warn('Body validation failed', errors);
    return sendError(res, { message: 'Validation failed', errors, status: 400 });
  }

  req.body = value; // replace with sanitised & coerced value
  return next();
};

/**
 * Returns an Express middleware that validates req.query against a Joi schema.
 * @param {import('joi').Schema} schema
 */
const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
    convert: true, // coerce strings to numbers etc.
  });

  if (error) {
    const errors = error.details.map((d) => ({
      field: d.path.join('.'),
      message: d.message,
    }));
    logger.warn('Query validation failed', errors);
    return sendError(res, { message: 'Validation failed', errors, status: 400 });
  }

  req.query = value;
  return next();
};

module.exports = { validateBody, validateQuery };
