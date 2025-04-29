const CartItem = require('../models/CartItem');

const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  const exists = await CartItem.findOne({ userId, productId });
  if (exists) return res.status(409).json({ msg: 'Item already in cart' });
  const newItem = new CartItem(req.body);
  await newItem.save();
  res.json({ msg: 'Added to cart' });
};

const getCart = async (req, res) => {
  const items = await CartItem.find({ userId: req.params.userId });
  res.json(items);
};

const removeFromCart = async (req, res) => {
  await CartItem.deleteOne({ userId: req.params.userId, productId: req.params.productId });
  res.json({ msg: 'Removed from cart' });
};

module.exports = { addToCart, getCart, removeFromCart };
