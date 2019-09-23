const express = require('express');
const router = express.Router();

// import Order model
const Order = require('../../models/Order');

//////////////
// ALL OF THESE ROUTES SHOULD OF COURSE BE PROTECTED BY AUTH!!!
// JUST TESTING HERE

// @route GET api/orders
// get all orders, sorted alphabetically
router.get('/', (_req, res) => {
  Order.find({}, null, { sort: { orderDate: -1 } })
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(404).json(err));
});

// @route GET api/orders/:id
// get a specific order
router.get('/order/:id', (req, res) => {
  Order.findById(req.params.id)
    .then(order => res.status(200).json(order))
    .catch(err => res.status(404).json(err));
});

// @route GET api/orders/user/:id
// get order(s) for specific user
router.get('/user/:userId', (req, res) => {
  Order.find({ userId: req.params.userId }, null, { sort: { orderDate: -1 } })
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(404).json(err));
});

// @route POST api/orders
// add order
router.post('/', (req, res) => {
  let orderedProducts = [];
  req.body.products.map(order => orderedProducts.push(order));

  const newOrder = new Order({
    userId: req.body.userId,
    userEmail: req.body.userEmail,
    products: orderedProducts,
    payment: req.body.payment
  });

  newOrder
    .save()
    .then(order => res.status(200).json(order))
    .catch(err => res.status(400).json(err));
});

// @route DELETE api/orders/order/:id
// delete order
router.delete('/order/:id', (req, res) => {
  Order.findById(req.params.id)
    .then(order =>
      order.remove().then(() => res.status(200).json({ deleted: true }))
    )
    .catch(() => res.status(404).json({ deleted: false }));
});

module.exports = router;
