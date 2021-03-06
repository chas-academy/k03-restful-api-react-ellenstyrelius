const express = require('express');
const router = express.Router();

// import auth middleware
const auth = require('../../middleware/authMiddleware');

// import Order model
const Order = require('../../models/Order');

// ALL ROUTES ARE PROTECTED ROUTES

// @route GET api/orders
// @access: admin
// get all orders, sorted alphabetically
router.get('/', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin)
    res
      .status(403)
      .json({ msg: `Permission denied, you need admin status to access this` });

  Order.find({}, null, { sort: { orderDate: -1 } })
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(404).json(err));
});

// @route GET api/orders/:id
// @access: admin and user who placed the order
// get a specific order
router.get('/order/:id', auth, (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      const isAdmin = req.user.isAdmin;
      const hasUserId = req.user.id === order.userId;

      if (isAdmin || hasUserId) res.status(200).json(order);
      return res.status(403).json({ msg: `Permission denied :(` });
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/orders/user/:id
// @access: admin and user who placed the order(s)
// get order(s) for specific user
router.get('/user/:userId', auth, (req, res) => {
  Order.find({ userId: req.params.userId }, null, { sort: { orderDate: -1 } })
    .then(orders => {
      const isAdmin = req.user.isAdmin;
      const hasUserId = req.user.id === req.params.userId;

      if (isAdmin || hasUserId) res.status(200).json(orders);
      return res.status(403).json({ msg: `Permission denied :(` });
    })
    .catch(err => res.status(404).json(err));
});

// @route POST api/orders
// @access: all authenticated users
// add order
router.post('/', auth, (req, res) => {
  let orderedProducts = [];
  req.body.products.map(order => orderedProducts.push(order));

  const newOrder = new Order({
    userId: req.user.id,
    products: orderedProducts,
    payment: req.body.payment
  });

  newOrder
    .save()
    .then(order => res.status(200).json(order))
    .catch(err => res.status(400).json(err));
});

// @route DELETE api/orders/order/:id
// @access: admin
// delete order
router.delete('/order/:id', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin) res.status(403).json({ msg: `Permission denied :(` });

  Order.findById(req.params.id)
    .then(order => {
      order.remove().then(() => res.status(200).json({ deleted: true }));
    })
    .catch(() => res.status(404).json({ deleted: false }));
});

module.exports = router;
