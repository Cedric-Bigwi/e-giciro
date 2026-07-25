'use strict';

// Approximate district centers (used as base coordinates with slight jitter)
const DISTRICT_COORDS = {
  Kigali: [-1.9441, 30.0619],
  Musanze: [-1.5, 29.6333],
  Rubavu: [-1.6777, 29.2667],
  Muhanga: [-2.0836, 29.7564],
  Huye: [-2.5975, 29.7394],
  Rusizi: [-2.4846, 28.9075],
  Nyagatare: [-1.2941, 30.3256],
  Gicumbi: [-1.6942, 30.0847]
};

function jitter(base, i) {
  return base + (i % 5) * 0.004 - 0.008;
}

module.exports = {
  up: async (queryInterface) => {
    const now = new Date();
    const districts = Object.keys(DISTRICT_COORDS);
    const categories = ['rice', 'cooking_oil', 'sugar', 'maize_flour', 'other'];
    const products = {
      rice: ['Kilombero Rice', 'Super Rice', 'Local Rice'],
      cooking_oil: ['Sunflower Oil (5L)', 'Vegetable Oil (5L)', 'Palm Oil (5L)'],
      sugar: ['White Sugar (50kg)', 'Brown Sugar (50kg)'],
      maize_flour: ['Maize Flour (25kg)', 'Fortified Maize Flour (25kg)'],
      other: ['Irish Potatoes (100kg)', 'Beans (100kg)', 'Salt (50kg)']
    };
    const basePrices = {
      rice: 1300,
      cooking_oil: 12000,
      sugar: 45000,
      maize_flour: 18000,
      other: 30000
    };
    const userIds = [2, 3, 4, 5, 6];
    const types = ['sell', 'sell', 'sell', 'buy'];

    const offers = [];
    for (let i = 0; i < 22; i++) {
      const category = categories[i % categories.length];
      const district = districts[i % districts.length];
      const [lat, lng] = DISTRICT_COORDS[district];
      const productList = products[category];
      const productName = productList[i % productList.length];
      const priceVariance = Math.round((Math.random() * 0.3 - 0.15) * basePrices[category]);

      offers.push({
        user_id: userIds[i % userIds.length],
        type: types[i % types.length],
        product_name: productName,
        category,
        price: basePrices[category] + priceVariance,
        description: `${productName} available in ${district}. Good quality, negotiable for bulk quantities.`,
        district,
        latitude: jitter(lat, i),
        longitude: jitter(lng, i),
        status: 'active',
        created_at: now,
        updated_at: now
      });
    }

    await queryInterface.bulkInsert('offers', offers);

    await queryInterface.bulkInsert('notifications', [
      {
        user_id: 2,
        message: 'A new Kilombero Rice sell offer was posted in Kigali matching your interests.',
        is_read: false,
        created_at: now
      },
      {
        user_id: 2,
        message: 'Welcome to e-Giciro! Start by browsing offers near you.',
        is_read: true,
        created_at: now
      },
      {
        user_id: 3,
        message: 'A buy offer for Sugar was posted close to your district.',
        is_read: false,
        created_at: now
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('notifications', null, {});
    await queryInterface.bulkDelete('offers', null, {});
  }
};
