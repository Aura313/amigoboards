import express from 'express';
import mongoose from 'mongoose';
import route from './route/user-route.js';
import cookieParser from 'cookie-parser';


const app=express();
//Connection to the mongo DB through mongoose
mongoose.connect('mongodb://localhost:27017/projectmanagement');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({estended:false}))

route(app);

export default app;

