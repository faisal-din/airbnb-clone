const User = require('../models/user');

module.exports.userSignup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    let registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Welcome to AirBnB');
      res.redirect('/listings');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/signup');
  }
};

module.exports.renderLoginForn = (req, res) => {
  res.render('users/login.ejs');
};

module.exports.userLogin = async (req, res) => {
  req.flash('success', 'Welcome to AirBnB, You are logged in!');
  let redirectUrl = res.locals.redirectUrl || '/listings' || '/listings';
  res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You are logged out!');
    res.redirect('/listings');
  });
};
