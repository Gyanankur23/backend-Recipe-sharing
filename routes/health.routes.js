const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

router.get('/', healthController.healthCheck);
router.get('/stats', healthController.getStats);

module.exports = router;
