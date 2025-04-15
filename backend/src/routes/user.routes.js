const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { getUserDetails, updateProfile } = require('../controllers/user.controller');

router.get('/', authenticate, getUserDetails);
router.patch('/', authenticate, updateProfile);

module.exports = router;