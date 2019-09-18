const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  hexCode: {
    type: String,
    required: true
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
      'orange red',
      'purple red',
      'brown red',
      'pale red',
      'green blue',
      'purple blue',
      'gray blue',
      'pale blue',
      'orange yellow',
      'green yellow',
      'brown yellow',
      'pale yellow',
      'blue green',
      'yellow green',
      'gray green',
      'pale green',
      'red orange',
      'pale orange',
      'red purple',
      'pink purple',
      'gray purple',
      'pale purple',
      'red pink',
      'pale pink',
      'red brown',
      'green brown',
      'yellow brown',
      'pale brown',
      'gray brown',
      'blue gray',
      'brown gray',
      'dark gray',
      'light gray',
      'yellow white',
      'pink white',
      'gray white',
      'green white'
    ]
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);
