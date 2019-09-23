const express = require('express');
const router = express.Router();

// import User model
const User = require('../../models/User');

// @route GET api/users
// get all users, sorted alphabetically
router.get('/', (_req, res) => {
  User.find({}, null, { sort: { name: 1 } })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err));
});

// @route GET api/users/:id
// get one user
router.get('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err));
});

// @route GET api/users/search
// get users based on query string params
// search name
router.get('/search', (req, res) => {
  const regexSearchString = new RegExp(req.query.q, 'i');
  User.find({ userName: regexSearchString }, null, { sort: { name: 1 } })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err));
});

///////////////////////
// this should of course NOT save password in this way!!!!!!
// just a test ok???!?
// @route POST api/users
// add user
router.post('/', (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });

  newUser
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
});

// @route PUT api/users/user/:id
// update user with as few or as many properties you want
router.put('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      for (let prop in user) {
        for (let reqProp in req.body) {
          if (prop === reqProp) {
            user[prop] = req.body[reqProp];
          }
        }
      }
      user
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(404).json(err));
});

// @route DELETE api/users/user/:id
// delete user
router.delete('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user =>
      user.remove().then(() => res.status(200).json({ deleted: true }))
    )
    .catch(() => res.status(404).json({ deleted: false }));
});

module.exports = router;
