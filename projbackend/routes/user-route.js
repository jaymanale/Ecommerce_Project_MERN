const express = require('express');
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getAllUser,
} = require('../controllers/user-controller');
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require('../controllers/auth-controller');

router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
router.get('/user/orders/:userId', isSignedIn, isAuthenticated);

router.get('/allUser', getAllUser);
module.exports = router;
