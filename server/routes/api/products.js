const express = require('express');
const router = express.Router();

// import Product model
const Product = require('../../models/Product');

// @route GET api/products
// get all products, sorted alphabetically
router.get('/', (_req, res) => {
  Product.find({}, null, { sort: { name: 1 } })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(404).json(err));
});

// @route GET api/products/:id
// get one product
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.status(200).json(product))
    .catch(err => res.status(404).json(err));
});

// @route GET api/products/categories/:category
// get all products of the same category
router.get('/categories/:category', (req, res) => {
  Product.find({ category: req.params.category })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(400).json(err));
});

// @route GET api/products/:subcategory
// get all products of the same subcategory
router.get('/categories/:category/:subcategory', (req, res) => {
  Product.find({
    category: req.params.category,
    subcategory: req.params.subcategory
  })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(400).json(err));
});

//////////////
// NOT WORKING, NOT FINISHED (obvi):
// @route GET api/products/search
// get products based on query string
// router.get('/search/search', (req, res) => {
//   Product.find({ name: req.params.q })
//     .then(products => res.status(200).json(products))
//     .catch(err => res.status(404).json(err));
// });

// @route POST api/products
// add product
router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    hexCode: req.body.hexCode,
    stock: req.body.stock,
    category: req.body.category,
    subcategory: req.body.subcategory
  });

  newProduct
    .save()
    .then(product => res.status(200).json(product))
    .catch(err => res.status(400).json(err));
});

// @route PUT api/products/:id
// update product with as few or as many properties you want
router.put('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      for (let prop in product) {
        for (let reqProp in req.body) {
          if (prop === reqProp) {
            product[prop] = req.body[reqProp];
          }
        }
      }
      product
        .save()
        .then(product => res.status(200).json(product))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(404).json(err));
});

// @route DELETE api/products/:id
// delete product
router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product =>
      product.remove().then(() => res.status(200).json({ deleted: true }))
    )
    .catch(() => res.status(404).json({ deleted: false }));
});

module.exports = router;
