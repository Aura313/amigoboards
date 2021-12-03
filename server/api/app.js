import express from 'express';
import mongoose from 'mongoose';
import route from './route/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// initialize express app
const app = express();

//Connection to the mongo DB through mongoose
mongoose.connect('mongodb://localhost:27017/projectmanagement');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


route(app);

export default app;
