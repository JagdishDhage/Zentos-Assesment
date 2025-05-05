import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoute from './routes/User.js';
import notes from './routes/Notes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();
app.use(cookieParser());
app.use(express.json());
const port=process.env.PORT 
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongo')
})

app.use('/user',UserRoute);
app.use('/notes',notes);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})