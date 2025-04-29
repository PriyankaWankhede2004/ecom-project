const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.json({ msg: 'Order placed successfully' });
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};

const cancelOrderItem = async (req, res) => {
  const { orderId, itemId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const item = order.items.find(i => i._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.status = 'Cancelled';
    await order.save();

    res.json({ message: 'Item cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling item', error: err.message });
  }
};

module.exports = { placeOrder, getOrders, cancelOrderItem };
