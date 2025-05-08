import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import boardRoutes from './Routes/Bord.js';
import listRoutes from './Routes/List.js';
import taskRoutes from './Routes/Task.js';
import authRoutes from './Routes/User.js';
import cookieParser from 'cookie-parser';
import Cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  Cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/user', authRoutes);
app.use('/boards', boardRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DBURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
