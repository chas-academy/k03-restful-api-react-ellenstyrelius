const express = require('express');
const router = express.Router();

// import auth middleware
const auth = require('../../middleware/authMiddleware');

// import Product model
const Product = require('../../models/Product');

// @route GET api/products
// @access: public
// get all products, sorted alphabetically
router.get('/', (_req, res) => {
  Product.find({}, null, { sort: { name: 1 } })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(404).json(err));
});

// @route GET api/products/:id
// @access: public
// get one product
router.get('/product/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.status(200).json(product))
    .catch(err => res.status(404).json(err));
});

// @route GET api/products/categories/:category
// @access: public
// get all products of the same category
router.get('/categories/:category', (req, res) => {
  Product.find({ category: req.params.category }, null, { sort: { name: 1 } })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(400).json(err));
});

// @route GET api/products/:subcategory
// @access: public
// get all products of the same subcategory
router.get('/categories/:category/:subcategory', (req, res) => {
  Product.find(
    {
      category: req.params.category,
      subcategory: req.params.subcategory
    },
    null,
    { sort: { name: 1 } }
  )
    .then(products => res.status(200).json(products))
    .catch(err => res.status(400).json(err));
});

// @route GET api/products/search
// @access: public
// get products by searching for query string params in name, category, subcategory
router.get('/search', (req, res) => {
  Product.find(
    { $text: { $search: req.query.q } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .then(products => res.status(200).json(products))
    .catch(err => res.status(404).json(err));
});

// @route POST api/products
// @access: admin
// add product
router.post('/', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;
  const { name, hexCode, stock, category, subcategory } = req.body;

  if (!isAdmin)
    res
      .status(403)
      .json({ msg: `Permission denied, you need admin status to access this` });

  Product.findOne({ name }).then(product => {
    if (product)
      return res
        .status(400)
        .json({ msg: 'A product with that name already exists' });

    const newProduct = new Product({
      name,
      hexCode,
      stock,
      category,
      subcategory
    });

    newProduct
      .save()
      .then(product => res.status(200).json(product))
      .catch(err => res.status(400).json(err));
  });
});

// @route PUT api/products/:id
// @access: admin
// update product with as few or as many properties you want
router.put('/product/:id', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin)
    res
      .status(403)
      .json({ msg: `Permission denied, you need admin status to access this` });

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

// @route DELETE api/products/product/:id
// @access: admin
// delete product
router.delete('/product/:id', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin)
    res
      .status(403)
      .json({ msg: `Permission denied, you need admin status to access this` });

  Product.findById(req.params.id)
    .then(product =>
      product.remove().then(() => res.status(200).json({ deleted: true }))
    )
    .catch(() => res.status(404).json({ deleted: false }));
});

module.exports = router;
