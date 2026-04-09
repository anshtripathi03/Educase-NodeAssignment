'use strict';

const express = require('express');
const router = express.Router();
const schoolRoutes = require('./school.routes');

// Health-check — used by Render / Railway / load balancers
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount school API routes at root level (assignment spec: /addSchool, /listSchools)
router.use('/', schoolRoutes);

module.exports = router;
