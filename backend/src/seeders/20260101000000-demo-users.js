'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const hash = (pwd) => bcrypt.hashSync(pwd, 10);
    const now = new Date();

    await queryInterface.bulkInsert('users', [
      {
        phone_number: '0788000000',
        name: 'System Admin',
        role: 'admin',
        password: hash('admin123'),
        district: 'Kigali',
        created_at: now,
        updated_at: now
      },
      {
        phone_number: '0788111111',
        name: 'Aline Uwase',
        role: 'consumer',
        password: hash('password123'),
        district: 'Kigali',
        created_at: now,
        updated_at: now
      },
      {
        phone_number: '0788222222',
        name: 'Jean de Dieu Habimana',
        role: 'shop_owner',
        password: hash('password123'),
        district: 'Musanze',
        created_at: now,
        updated_at: now
      },
      {
        phone_number: '0788333333',
        name: 'Chantal Mukamana',
        role: 'wholesaler',
        password: hash('password123'),
        district: 'Huye',
        created_at: now,
        updated_at: now
      },
      {
        phone_number: '0788444444',
        name: 'Eric Nshimiyimana',
        role: 'manufacturer',
        password: hash('password123'),
        district: 'Rubavu',
        created_at: now,
        updated_at: now
      },
      {
        phone_number: '0788555555',
        name: 'Solange Ingabire',
        role: 'shop_owner',
        password: hash('password123'),
        district: 'Muhanga',
        created_at: now,
        updated_at: now
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
