const Product = require('../models/product');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: 'Product does not exist',
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {};
