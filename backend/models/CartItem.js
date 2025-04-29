const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: String,
  productId: Number,
  title: String,
  thumbnail: String,
  price: Number,
  brand: String,
  category: String,
});

module.exports = mongoose.model('CartItem', cartItemSchema);