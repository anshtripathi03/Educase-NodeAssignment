'use strict';

const Joi = require('joi');

/** Schema for POST /addSchool request body */
const addSchoolSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required().messages({
    'string.empty': 'School name is required',
    'string.min': 'School name must be at least 2 characters',
    'string.max': 'School name must not exceed 255 characters',
    'any.required': 'School name is required',
  }),

  address: Joi.string().trim().min(5).max(500).required().messages({
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 5 characters',
    'string.max': 'Address must not exceed 500 characters',
    'any.required': 'Address is required',
  }),

  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be between -90 and 90',
    'number.max': 'Latitude must be between -90 and 90',
    'any.required': 'Latitude is required',
  }),

  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be between -180 and 180',
    'number.max': 'Longitude must be between -180 and 180',
    'any.required': 'Longitude is required',
  }),
});

/** Schema for GET /listSchools query parameters */
const listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be between -90 and 90',
    'number.max': 'Latitude must be between -90 and 90',
    'any.required': 'Latitude query parameter is required',
  }),

  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be between -180 and 180',
    'number.max': 'Longitude must be between -180 and 180',
    'any.required': 'Longitude query parameter is required',
  }),

  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a positive integer',
    'number.min': 'Page must be at least 1',
  }),

  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a positive integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit must not exceed 100',
  }),
});

module.exports = { addSchoolSchema, listSchoolsSchema };
