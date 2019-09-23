const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderedProductsSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  hexCode: String,
  amount: { type: Number, default: 1 }
});

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  products: { type: [OrderedProductsSchema], default: undefined },
  payment: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }
});

module.exports = Order = mongoose.model('order', OrderSchema);
