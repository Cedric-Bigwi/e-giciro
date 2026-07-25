const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    toSafeJSON() {
      const { password, ...safe } = this.toJSON();
      return safe;
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^0[7][0-9]{8}$/i
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('consumer', 'shop_owner', 'wholesaler', 'manufacturer', 'admin'),
        allowNull: false,
        defaultValue: 'consumer'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
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
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return User;
};
