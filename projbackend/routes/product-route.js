const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  getAllProducts,
  updateProduct,
  deleteProduct,
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

//create
router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// view
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

// delete
router.delete(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update
router.put(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// listing route
router.get('/products', getAllProducts);

module.exports = router;
