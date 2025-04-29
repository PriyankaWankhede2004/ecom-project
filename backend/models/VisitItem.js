const mongoose = require('mongoose');

const visitItemSchema = new mongoose.Schema({
  userId: String,
  productId: Number,
  title: String,
  thumbnail: String,
  price: Number,
  brand: String,
  category: String,
});

module.exports = mongoose.model('VisitItem', visitItemSchema);