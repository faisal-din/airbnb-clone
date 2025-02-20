const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { listingSchema } = require('../schema');
const Listing = require('../models/listings');

// validateListing Middleware -
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Listing routes
// Index Route
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {
      allListings,
    });
  })
);

// New Route
router.get('/new', (req, res) => {
  res.render('listings/newListing.ejs');
});

// Show Route
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/showListing.ejs', { listing });
  })
);

// Create Route - POST
router.post(
  '/',
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
  })
);

// Edit Route
router.get(
  '/:id/edit',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/editListing.ejs', { listing });
  })
);

// Update Route
router.put(
  '/:id',
  validateListing,
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
router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
  })
);

module.exports = router;
