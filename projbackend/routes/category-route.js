const express = require('express');
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require('../controllers/category-controller');
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require('../controllers/auth-controller');
const { getUserById } = require('../controllers/user-controller');

// params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// routes

// create
router.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read
router.get(
  '/category/:categoryId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getCategory
);
router.get('/categories', isSignedIn, isAuthenticated, isAdmin, getAllCategory);

// update
router.put(
  '/category/:categoryId:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// Delete

router.delete(
  '/category/:categoryId:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
