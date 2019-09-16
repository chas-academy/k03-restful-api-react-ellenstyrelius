const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderedProductSchema = new Schema({
  name: String,
  hexCode: String,
  amount: Number
});

const OrderSchema = new Schema(
  {
    userName: { type: String, required: true },
    products: { type: [OrderedProductSchema], default: undefined },
    payment: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model('order', OrderSchema);
