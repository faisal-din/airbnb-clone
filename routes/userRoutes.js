const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middlewares/middlewares');

const userController = require('../controllers/userController');

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs');
});

router.post('/signup', wrapAsync(userController.userSignup));

// render login form
router.get('/login', userController.renderLoginForn);

// login route with passport authentication middleware and flash messages
router.post(
  '/login',
  saveRedirectUrl,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  userController.userLogin
);

router.get('/logout', userController.userLogout);

module.exports = router;
