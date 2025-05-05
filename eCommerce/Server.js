import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import Cart from './Routes/Cart.js';
import order from './Routes/Order.js';
import product from './Routes/Product.js';
import user from './Routes/User.js';

// Initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Body parser
app.use(express.json());

// Routes
app.use('/api/products', product);
app.use('/api/cart', Cart);
app.use('/api/orders', order);
app.use('/api/users', user);

// DB connection
mongoose.connect('mongodb://localhost:27017/eCommerce')
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('MongoDB connection error:', err));

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
