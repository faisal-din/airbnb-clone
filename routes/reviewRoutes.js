const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listings');
const Review = require('../models/reviews');
const { validateReviews } = require('../middlewares/middlewares');

// Review routes
// Create Reviews
// POST Route
router.post(
  '/',
  validateReviews,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success', ' New Review Created!');
    res.redirect(`/listings/${listing._id}`);
  })
);

// Delete Review
router.delete(
  '/:reviewId',
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review Deleted!');
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
