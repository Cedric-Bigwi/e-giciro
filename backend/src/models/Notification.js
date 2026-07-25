const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Notification extends Model {}

  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    }
  );

  return Notification;
};
