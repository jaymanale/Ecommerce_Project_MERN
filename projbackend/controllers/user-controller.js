const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = (req, res, next, id) => {
  console.log('user-controller - getUserById() - Initiated');
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(403).json({
        error: 'No User was fund',
      });
    }

    req.profile = user;
    next();
  });
  console.log('user-controller - getUserById() - Terminated');
};

exports.getUser = (req, res) => {
  console.log('user-controller - getUser() - Initiated');
  // as we dont neeed to return these 2 values to frontend set to undefined
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'You are not authorised to update user',
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      return res.json(user);
    }
  );
};

// TESTING ONLY::
exports.getAllUser = (req, res) => {
  User.find().exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No User present in DB...',
      });
    }
    res.json(user);
  });
};

exports.userPurchsedList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('User', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: ' No order for this USER',
        });
      }
      res.json(order);
    });
};

exports.pushOrderInPurchasedList = (req, res, next) => {
  let purchases = [];
  req.body.order.array.forEach((product) => {
    purchases.push({
      _id: product_id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: product.amount,
      transaction_id: product.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile_id },
    { $push: purchases },
    { new: true },
    (err, purchase) => {
      if (err || !purchase) {
        return res.status(400).json({
          error: 'unable to save product list',
        });
      }
      next();
    }
  );
};
