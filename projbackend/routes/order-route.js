const express = require('express');
const router = express.Router();
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require('../controllers/auth-controller');
const {
  getUserById,
  pushOrderInPurchasedList,
} = require('../controllers/user-controller');
const { updateStock } = require('../controllers/product-controller');

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require('../controllers/order-controller');

// param
router.param('userId', getUserById);
router.param('orderId', getOrderById);

//routes
router.push(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchasedList,
  updateStock,
  createOrder
);

router.get(
  '/order/all/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  '/order/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
