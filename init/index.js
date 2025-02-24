require('dotenv').config();

const mongoose = require('mongoose');
const initdata = require('./data');
const Listing = require('../models/listings');

const dbURL = process.env.MONGO_URL;

main()
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURL);
}

const initDatabase = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: '67b9661d62f87f2ab19f89e8',
    geometry: {
      type: 'Point',
      coordinates: [obj.longitude || 78.4772, obj.latitude || 17.4065], // Add default coordinates if none exist
    },
  }));
  await Listing.insertMany(initdata.data);
  console.log('Database initialized');
};

initDatabase();
