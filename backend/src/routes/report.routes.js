const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { generateReport, getReports } = require('../controllers/report.controller');

router.post('/', authenticate, authorize('admin'), generateReport);
router.get('/', authenticate, getReports);

module.exports = router;