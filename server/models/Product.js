const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  hexCode: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    default: 100
  },
  category: {
    type: String,
    enum: [
      'red',
      'blue',
      'yellow',
      'green',
      'orange',
      'purple',
      'pink',
      'brown',
      'gray',
      'black',
      'white'
    ],
    required: true
  },
  subcategory: {
    type: [String],
    enum: [
      'orange-red',
      'purple-red',
      'brown-red',
      'light-red',
      'dark-red',
      'green-blue',
      'purple-blue',
      'gray-blue',
      'light-blue',
      'dark-blue',
      'orange-yellow',
      'green-yellow',
      'brown-yellow',
      'light-yellow',
      'dark-yellow',
      'blue-green',
      'yellow-green',
      'gray-green',
      'light-green',
      'dark-green',
      'red-orange',
      'light-orange',
      'dark-orange',
      'red-purple',
      'pink-purple',
      'gray-purple',
      'light-purple',
      'dark-purple',
      'red-pink',
      'light-pink',
      'dark-pink',
      'red-brown',
      'green-brown',
      'yellow-brown',
      'light-brown',
      'dark-brown',
      'gray-brown',
      'blue-gray',
      'brown-gray',
      'green-gray',
      'dark-gray',
      'light-gray',
      'yellow-white',
      'pink-white',
      'gray-white',
      'blue-white'
    ]
  }
});

ProductSchema.index({
  name: 'text',
  category: 'text',
  subcategory: 'text'
});

module.exports = Product = mongoose.model('product', ProductSchema);
