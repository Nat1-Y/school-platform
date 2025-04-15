const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { login, register, getProfile } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authenticate, getProfile);

module.exports = router;