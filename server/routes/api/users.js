const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// import auth middleware
const auth = require('../../middleware/authMiddleware');

// import User model
const User = require('../../models/User');

// @route GET api/users
// @access: admin
// get all users, sorted alphabetically
router.get('/', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin)
    res
      .status(403)
      .json({ msg: `Permission denied, you need admin status to access this` });

  User.find({}, null, { sort: { createdAt: -1 } })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err));
});

// @route GET api/users/:id
// @access: admin and user with correct id
// get one user
router.get('/user/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const isAdmin = req.user.isAdmin;
      const hasUserId = req.user.id === req.params.id;

      if (isAdmin || hasUserId) res.status(200).json(user);
      return res.status(403).json({ msg: `Permission denied :(` });
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/users/search
// @access: admin
// get users by searching for query string params in name and email fields
router.get('/search', auth, (req, res) => {
  const isAdmin = req.user.isAdmin;

  if (!isAdmin)
    res
      .status(403)
      .json({ msg: `Permission denied, you need admin status to access this` });

  const regexSearchString = new RegExp(req.query.q, 'i');
  User.find(
    { $or: [{ name: regexSearchString }, { email: regexSearchString }] },
    null,
    { sort: { createdAt: -1 } }
  )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err));
});

// @route POST api/users
// @access: public
// add user with hashed password after checking for already existing user
router.post('/', (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  User.findOne({ email }).then(user => {
    if (user)
      return res
        .status(400)
        .json({ msg: 'A user with that email address already exists' });

    const newUser = new User({
      name,
      email,
      password,
      isAdmin
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.status(500).json(err);
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) res.status(500).json(err);
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.status(200).json({
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin
            });
          })
          .catch(err => res.status(400).json(err));
      });
    });
  });
});

// @route PUT api/users/user/:id
// @access: admin and user with correct id
// update user with as few or as many properties you want
router.put('/user/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const isAdmin = req.user.isAdmin;
      const hasUserId = req.user.id === req.params.id;

      if (isAdmin || hasUserId) {
        for (let prop in user) {
          for (let reqProp in req.body) {
            if (prop === reqProp) {
              user[prop] = req.body[reqProp];
            }
          }
        }
        return user
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => res.status(400).json(err));
      }
      return res.status(403).json({ msg: `Permission denied :(` });
    })
    .catch(err => res.status(404).json(err));
});

// @route DELETE api/users/user/:id
// @access: admin and user with correct id
// delete user
router.delete('/user/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const isAdmin = req.user.isAdmin;
      const hasUserId = req.user.id === req.params.id;

      if (isAdmin || hasUserId)
        return user
          .remove()
          .then(() => res.status(200).json({ deleted: true }));
      return res.status(403).json({ msg: `Permission denied :(` });
    })
    .catch(() => res.status(404).json({ deleted: false }));
});

module.exports = router;
