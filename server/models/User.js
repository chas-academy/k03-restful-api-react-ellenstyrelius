const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'You need to submit a name']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'You need to submit an email address']
    },
    password: {
      type: String,
      required: true,
      validate: [
        input => {
          return input.length >= 6;
        },
        'Password should be at least six characters.'
      ]
    },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
