const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listings');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const MONGO_URL = 'mongodb://127.0.0.1:27017/airbnb';

main()
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set EJS as the template engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Index Route
app.get('/listings', async (req, res) => {
  const allListings = await Listing.find({});

  res.render('listings/index.ejs', {
    allListings,
  });
});

// New Route
app.get('/listings/new', (req, res) => {
  res.render('listings/newListing.ejs');
});

// Show Route
app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send('Listing not found');
  }

  res.render('listings/showListing.ejs', { listing });
});

// Create Route - POST
app.post('/listings', async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/listings');
});

// Edit Route
app.get('/listings/:id/edit', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  // if (!listing) {
  //   return res.status(404).send('Listing not found');
  // }

  res.render('listings/editListing.ejs', { listing });
});

// Update Route
app.put('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    {
      runValidators: true,
      new: true,
    }
  );
  console.log('Updated Listing:', listing);
  res.redirect(`/listings/${listing._id}`);
});

// Delete Route
app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
});

// Add a new route to the server that saves a new listing to the database. The route should be a GET request to /listings. Inside the route, create a new instance of the Listing model with the following properties:

// app.get('/testlisting', async (req, res) => {
//   let sampleListing = new Listing({
//     title: 'Cozy Beachfront Cottage',
//     description:
//       'Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.',
//     price: 1500,
//     location: 'Malibu',
//     country: 'United States',
//   });

//   await sampleListing.save();
//   console.log('Listing saved successfully');
//   res.send('Listing saved successfully');
// });

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
