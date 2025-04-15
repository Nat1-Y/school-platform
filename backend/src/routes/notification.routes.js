const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { getNotifications, markAsRead } = require('../controllers/notification.controller');

router.get('/', authenticate, getNotifications);
router.patch('/:notification_id/read', authenticate, markAsRead);

module.exports = router;