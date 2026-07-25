// Config file consumed only by sequelize-cli (migrations & seeders).
// The running app itself uses src/config/database.js, which reads the
// same DB_STORAGE env var so both always point at the same file.
require('dotenv').config();

const storage = process.env.DB_STORAGE || './database/e_giciro.sqlite';

module.exports = {
  development: {
    dialect: 'sqlite',
    storage,
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: './database/e_giciro_test.sqlite',
    logging: false
  },
  production: {
    dialect: 'sqlite',
    storage,
    logging: false
  }
};
