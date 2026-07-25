const { Notification } = require('../models');
const { success } = require('../utils/helpers');

async function listNotifications(req, res, next) {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      limit: 50
    });
    const unreadCount = await Notification.count({ where: { user_id: req.user.id, is_read: false } });
    return success(res, { notifications, unreadCount });
  } catch (err) {
    next(err);
  }
}

async function markAsRead(req, res, next) {
  try {
    const notification = await Notification.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found.' });

    notification.is_read = true;
    await notification.save();
    return success(res, { notification }, 'Notification marked as read.');
  } catch (err) {
    next(err);
  }
}

async function markAllAsRead(req, res, next) {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
    return success(res, null, 'All notifications marked as read.');
  } catch (err) {
    next(err);
  }
}

module.exports = { listNotifications, markAsRead, markAllAsRead };
