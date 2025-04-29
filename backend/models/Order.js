const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: Number,
      title: String,
      thumbnail: String,
      price: Number,
      brand: String,
      category: String,
      quantity: { type: Number, default: 1 },
      size: { type: String, default: null },
      status: { type: String, default: 'Placed' },
    }
  ],
  name: String,
  address: String,
  mobile: String,
  district: String,
  country: String,
  state: String,
});

module.exports = mongoose.model('Order', orderSchema);