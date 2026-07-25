const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Offer extends Model {}

  Offer.init(
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
      type: {
        type: DataTypes.ENUM('buy', 'sell'),
        allowNull: false
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.ENUM('rice', 'cooking_oil', 'sugar', 'maize_flour', 'other'),
        allowNull: false,
        defaultValue: 'other'
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      district: {
        type: DataTypes.ENUM(
          'Kigali',
          'Musanze',
          'Rubavu',
          'Muhanga',
          'Huye',
          'Rusizi',
          'Nyagatare',
          'Gicumbi'
        ),
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'active'
      }
    },
    {
      sequelize,
      modelName: 'Offer',
      tableName: 'offers',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Offer;
};
