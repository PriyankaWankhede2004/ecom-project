const VisitItem = require('../models/VisitItem');

const toggleVisit = async (req, res) => {
  const { userId, productId } = req.body;
  const existing = await VisitItem.findOne({ userId, productId });
  if (existing) {
    await VisitItem.deleteOne({ userId, productId });
    return res.json({ msg: 'Removed from visitlist' });
  }
  const item = new VisitItem(req.body);
  await item.save();
  res.json({ msg: 'Added to visitlist' });
};

const getVisitlist = async (req, res) => {
  const items = await VisitItem.find({ userId: req.params.userId });
  res.json(items);
};

const removeVisit = async (req, res) => {
  await VisitItem.deleteOne({ userId: req.params.userId, productId: req.params.productId });
  res.json({ msg: 'Removed from visitlist' });
};

module.exports = { toggleVisit, getVisitlist, removeVisit };