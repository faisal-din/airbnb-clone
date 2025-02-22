const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const Review = require('../models/reviews');
const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require('../middlewares/middlewares');

const reviewController = require('../controllers/reviewController');

// Review routes
// Create Reviews
// POST Route
router.post(
  '/',
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

// Delete Review
router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
