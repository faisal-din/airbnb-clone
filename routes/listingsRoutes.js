const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const {
  validateListing,
  isLoggedIn,
  isOwner,
} = require('../middlewares/middlewares');

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
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/newListing.ejs');
});

// Show Route
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate('reviews')
      .populate('owner');
    if (!listing) {
      req.flash('error', ' Listing not found!');
      res.redirect('/listings');
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
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', ' New Listing Created!');
    res.redirect('/listings');
  })
);

// Edit Route
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash('error', ' Listing not found!');
      res.redirect('/listings');
    }
    res.render('listings/editListing.ejs', { listing });
  })
);

// Update Route
router.put(
  '/:id',
  validateListing,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      {
        runValidators: true,
        new: true,
      }
    );
    req.flash('success', ' Listing Updated!');
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', '  Listing Deleted!');
    res.redirect('/listings');
  })
);

module.exports = router;
