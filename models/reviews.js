const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = {
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createedAt: {
    type: Date,
    default: Date.now,
  },
};

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
