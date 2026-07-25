const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const storagePath = process.env.DB_STORAGE
  ? path.resolve(__dirname, '..', '..', process.env.DB_STORAGE.replace(/^\.\//, ''))
  : path.resolve(__dirname, '..', '..', 'database', 'e_giciro.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
  define: {
    underscored: true
  }
});

module.exports = sequelize;
