const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    product: [productCartSchema],
    transaction_id: {},
    amount: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    updated: {
      type: Date,
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

let order = mongoose.model('Order', orderSchema);
let productCart = mongoose.model('ProductCart', productCartSchema);

module.exports = { order, productCart };
