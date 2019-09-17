const express = require('express');
const router = express.Router();

// import Product model
const Product = require('../../models/Product');

// @route GET api/products
// get all products
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => console.log('Could not get products', err));
});

// @route POST api/products
// add product
router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    hexCode: req.body.hexCode,
    stock: req.body.stock
  });

  newProduct.save().then(product => res.json(product));
});

module.exports = router;
