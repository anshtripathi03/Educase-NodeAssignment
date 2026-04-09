'use strict';

const express = require('express');
const router = express.Router();

const SchoolController = require('../controllers/school.controller');
const { validateBody, validateQuery } = require('../middlewares/validate');
const { addSchoolSchema, listSchoolsSchema } = require('../utils/validators');

/**
 * @route  POST /addSchool
 * @desc   Add a new school
 * @access Public
 */
router.post('/addSchool', validateBody(addSchoolSchema), SchoolController.addSchool);

/**
 * @route  GET /listSchools
 * @desc   List all schools sorted by proximity to the given coordinates
 * @access Public
 */
router.get('/listSchools', validateQuery(listSchoolsSchema), SchoolController.listSchools);

module.exports = router;
