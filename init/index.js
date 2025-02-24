const mongoose = require('mongoose');
const initdata = require('./data');
const Listing = require('../models/listings');

main()
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDatabase = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: '67b9661d62f87f2ab19f89e8',
  }));
  await Listing.insertMany(initdata.data);
  console.log('Database initialized');
};

initDatabase();
