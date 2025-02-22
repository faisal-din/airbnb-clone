const { model } = require('mongoose');
const Listing = require('../models/listings');

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', {
    allListings,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render('listings/newListing.ejs');
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('owner');
  if (!listing) {
    req.flash('error', ' Listing not found!');
    res.redirect('/listings');
  }
  res.render('listings/showListing.ejs', { listing });
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash('success', ' New Listing Created!');
  res.redirect('/listings');
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', ' Listing not found!');
    res.redirect('/listings');
  }
  res.render('listings/editListing.ejs', { listing });
};

module.exports.updateListing = async (req, res) => {
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
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', '  Listing Deleted!');
  res.redirect('/listings');
};
