'use strict';

/**
 * Sends a standardised success response.
 * @param {import('express').Response} res
 * @param {object}  opts
 * @param {string}  opts.message
 * @param {*}       [opts.data]
 * @param {object}  [opts.meta]   - Pagination / extra metadata
 * @param {number}  [opts.status] - HTTP status code (default 200)
 */
const sendSuccess = (res, { message, data, meta, status = 200 }) => {
  const payload = { success: true, message };
  if (data !== undefined) payload.data = data;
  if (meta !== undefined) payload.meta = meta;
  return res.status(status).json(payload);
};

/**
 * Sends a standardised error response.
 * @param {import('express').Response} res
 * @param {object}  opts
 * @param {string}  opts.message
 * @param {*}       [opts.errors] - Validation error details
 * @param {number}  [opts.status] - HTTP status code (default 500)
 */
const sendError = (res, { message, errors, status = 500 }) => {
  const payload = { success: false, message };
  if (errors !== undefined) payload.errors = errors;
  return res.status(status).json(payload);
};

module.exports = { sendSuccess, sendError };
