const User = require('../models/User');

const loginUser = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId, password });
  if (!user) return res.status(401).json({ msg: 'Invalid credentials, please enter correct user id and password' });
  res.json(user);
};

const registerUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({
        message: 'This user ID is already used. Please create a different user ID.'
      });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(400).json({
      message: 'This user ID is already used. Please create a different user ID.'
    });
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
};

module.exports = { loginUser, registerUser, getProfile };