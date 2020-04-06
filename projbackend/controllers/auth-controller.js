const User = require('../models/user');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
  // checking if any validation error exist or not
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array(),
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: 'not able to save user data in DB',
      });
    }
    res.json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({
      error: errors.array(),
    });
  }

  // check email exist or not, then follow
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: 'user Email does not exist',
      });
    }

    // to check no email exist
    if (!user) {
      return res.status(400).json({
        error: 'Invalid email id',
      });
    }

    // check for valid password
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: ' email and password does not exist',
      });
    }

    // if all valid create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });
    // response to front-end
    const { _id, name, email, role } = user;

    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Signout successfully',
  });
};
// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
});

// customs middlewere

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: ' ACCESS DENIED haha',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'NOT ADMIN, ACCESS DENIED',
    });
  }

  next();
};
