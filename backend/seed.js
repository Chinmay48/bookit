// seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const PromoCode = require('./models/PromoCode'); // adjust path if needed

const promoCodes = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    isActive: true,
  },
  {
    code: 'SUMMER25',
    discountType: 'percentage',
    discountValue: 25,
    isActive: true,
  },
  {
    code: 'FESTIVE50',
    discountType: 'flat',
    discountValue: 350,
    isActive: true,
  },
  {
    code: 'EXPIRED5',
    discountType: 'percentage',
    discountValue: 5,
    isActive: false,
  },
];

async function seedPromoCodes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB connected');

    await PromoCode.deleteMany({});
    console.log('Old promo codes cleared');

    await PromoCode.insertMany(promoCodes);
    console.log(' Promo codes seeded successfully');

    mongoose.connection.close();
    console.log(' Connection closed');
  } catch (err) {
    console.error(' Error seeding promo codes:', err);
    mongoose.connection.close();
  }
}

seedPromoCodes();
