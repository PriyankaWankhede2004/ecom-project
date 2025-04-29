const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  userId: { type: String, unique: true },
  password: String,
  address: String,
  mobile: String,
  state: String,
  district: String,
  country: String
});

module.exports = mongoose.model('User', userSchema);