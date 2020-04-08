const { order, productCart } = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
  order
    .findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No Order found in DB',
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Falied to created order',
      });
    }
    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  order
    .find()
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'No Order present in DB',
        });
      }
      return res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  return res.json(order.schema.path('status').enumValues);
};

exports.updateStatus = (req, res) => {
  order.update(
    { _id: req.body.order_id },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: 'an not update order status',
        });
      }
      return res.json(order);
    }
  );
};
