const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { sendMessage, getMessages } = require('../controllers/message.controller');

router.post('/', authenticate, sendMessage);
router.get('/', authenticate, getMessages);

module.exports = router;