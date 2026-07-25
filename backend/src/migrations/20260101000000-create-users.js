'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('consumer', 'shop_owner', 'wholesaler', 'manufacturer', 'admin'),
        allowNull: false,
        defaultValue: 'consumer'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      district: {
        type: Sequelize.ENUM(
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
