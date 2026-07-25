'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('buy', 'sell'),
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('rice', 'cooking_oil', 'sugar', 'maize_flour', 'other'),
        allowNull: false,
        defaultValue: 'other'
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'active'
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

    await queryInterface.addIndex('offers', ['district']);
    await queryInterface.addIndex('offers', ['category']);
    await queryInterface.addIndex('offers', ['status']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('offers');
  }
};
