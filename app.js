const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listings');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');

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
app.get(
  '/listings',
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {
      allListings,
    });
  })
);

// New Route
app.get('/listings/new', (req, res) => {
  res.render('listings/newListing.ejs');
});

// Show Route
app.get(
  '/listings/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }

    res.render('listings/showListing.ejs', { listing });
  })
);

// Create Route - POST
app.post(
  '/listings',
  wrapAsync(async (req, res, next) => {
    if (!req.body.listing) {
      throw new ExpressError(400, 'Send Valid Listing Data');
    }
    const newListing = new Listing(req.body.listing);
    const savedListing = await newListing.save();
    res.redirect('/listings');
  })
);

// Edit Route
app.get(
  '/listings/:id/edit',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }

    res.render('listings/editListing.ejs', { listing });
  })
);

// Update Route
app.put(
  '/listings/:id',
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, 'Send Valid Listing Data');
    }
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      {
        runValidators: true,
        new: true,
      }
    );

    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete Route
app.delete(
  '/listings/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
  })
);

app.all('*', (req, res, next) => {
  return next(new ExpressError(404, 'Page Not Found'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = 'Something Error Occurred' } = err;

  // res.status(status).send(message);
  res.render('error.ejs', { message });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
