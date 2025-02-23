const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const {
  validateListing,
  isLoggedIn,
  isOwner,
} = require('../middlewares/middlewares');
const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });

// Controller
const listingController = require('../controllers/listingController');

// Listing routes
// Index Route
router.get('/', wrapAsync(listingController.index));

// Render New Route
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Show Route
router.get('/:id', wrapAsync(listingController.showListing));

// Create Route - POST
router.post(
  '/',
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
);

// Edit Route
router.get(
  '/:id/edit',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route
router.put(
  '/:id',
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
);

// Delete Route
router.delete(
  '/:id',
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);

module.exports = router;
