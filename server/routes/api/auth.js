const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// import User model
const User = require('../../models/User');

// @route POST api/auth
// authenticate user
router.post('/', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user)
      return res
        .status(400)
        .json({ msg: 'No user with that email address exists' });

    bcrypt.compare(password, user.password).then(passwordsMatch => {
      if (!passwordsMatch)
        return res.status(400).json({ msg: 'Invalid password' });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 43200 },
        (err, token) => {
          if (err) res.status(500).json(err);
          res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin
            }
          });
        }
      );
    });
  });
});

module.exports = router;
