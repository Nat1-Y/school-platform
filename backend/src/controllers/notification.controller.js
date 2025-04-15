const { Notification } = require('../models/notification.model');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.user_id },
      order: [['created_at', 'DESC']]
    });

    res.send(notifications);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notification_id } = req.params;

    const notification = await Notification.findByPk(notification_id);
    if (!notification) {
      return res.status(404).send({ error: 'Notification not found' });
    }

    notification.is_read = true;
    await notification.save();

    res.send(notification);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead
};