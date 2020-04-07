const Product = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

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

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: ' Falied to create product',
      });
    }

    // TODO: getting form data
    const product = new Product(fields);

    // handle the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'File size too big!!!',
        });
      }
      // putting file info in product obj
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save data to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Save product failed',
        });
      }
      return res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Delete
exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.product._id).exec((err, deletedProduct) => {
    if (err || !deletedProduct) {
      return res.status(400).json({
        error: 'Unable to delete product',
      });
    }
    return res.json({ message: 'Product deleted successfully...' });
  });
};

// Update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: ' Falied to create product',
      });
    }

    const product = req.product;
    product = _.extend(product, fields);

    // handle the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'File size too big!!!',
        });
      }
      // putting file info in product obj
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save data to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Update product failed',
        });
      }
      return res.json({
        meassge: 'Product updated successfully...',
        product: product,
      });
    });
  });
};

// listing

exports.getAllProducts = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: 'No Product found in DB',
        });
      }
      return res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  const myOrder = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOrder, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Bulk Operation failed',
      });
    }
  });
};
