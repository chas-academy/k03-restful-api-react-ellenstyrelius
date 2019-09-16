const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  hexCode: { type: String, required: true },
  stock: { type: Number, required: true }
});

module.exports = Product = mongoose.model('product', ProductSchema);
