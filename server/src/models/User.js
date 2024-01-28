const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, minlength: 5, unique: true },
    password: { type: String, required: true, minlength: 8 },
    lastLogin: { type: Number, required: true, default: 0 },
  },
  { versionKey: false }
);

const User = mongoose.model('User', UserSchema, 'estate-users');
module.exports = User;
