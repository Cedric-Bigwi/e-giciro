const sequelize = require('../config/database');
const UserModel = require('./User');
const OfferModel = require('./Offer');
const NotificationModel = require('./Notification');

const User = UserModel(sequelize);
const Offer = OfferModel(sequelize);
const Notification = NotificationModel(sequelize);

// Associations
User.hasMany(Offer, { foreignKey: 'user_id', as: 'offers', onDelete: 'CASCADE' });
Offer.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'recipient' });

module.exports = {
  sequelize,
  User,
  Offer,
  Notification
};
