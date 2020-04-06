var express = require('express');
var router = express.Router();
const {
  signup,
  signin,
  signout,
  isSignedIn,
} = require('../controllers/auth-controller');
const { check, validationResult } = require('express-validator');

// ( #route, #doing validation, #what it suppose to do after it goes to this route)
router.post(
  '/signup',
  [
    check('name', 'Name should be at east 3 chars').isLength({ min: 3 }),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'please provide atleast 5 chars').isLength({ min: 5 }),
  ],
  signup
);

router.post(
  '/signin',
  [
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'please provide atleast 5 chars').isLength({ min: 5 }),
  ],
  signin
);
router.get('/signout', signout);

//for protected routes
router.get('/test', isSignedIn, (req, res) => {
  return res.json({
    message: 'this is test rest protected',
  });
});
module.exports = router;
