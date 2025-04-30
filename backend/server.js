const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const visitRoutes = require('./routes/visitRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors({
  origin:
    'https://ecom-project-woad.vercel.app',
  credentials:true
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/visitlist', visitRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
