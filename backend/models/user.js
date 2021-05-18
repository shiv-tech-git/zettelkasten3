const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  passwd: String
});

module.exports = mongoose.model('users', UserSchema)