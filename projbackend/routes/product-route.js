const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
} = require('../controllers/product-controller');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/auth-controller');
const { getUserById } = require('../controllers/user-controller');
const {} = require('../controllers/category-controller');

//param
router.param('userId', getUserById);
router.param('productId', getProductById);

// Routes

router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
