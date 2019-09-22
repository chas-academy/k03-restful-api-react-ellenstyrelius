const express = require('express');
const router = express.Router();

// import User model
const User = require('../../models/User');

// @route GET api/users
// get all users, sorted alphabetically
router.get('/', (_req, res) => {
  User.find({}, null, { sort: { name: 1 } })
    .then(users => res.json(users))
    .catch(res.status(404));
});

module.exports = router;
