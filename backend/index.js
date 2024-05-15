import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connectToMongoDB.js';
import { app,server } from './socket/socket.js';
// const app = express()
const PORT = process.env.PORT || 8000
dotenv.config()
app.use(express.json());  
app.use(cookieParser());

app.use('/api/auth' , authRoutes);;
app.use('/api/messages' , messageRoutes);
app.use('/api/users' , userRoutes);


server.listen(PORT , ()=> {
connectToMongoDB()
    console.log(`server runing port ${PORT}`)

})