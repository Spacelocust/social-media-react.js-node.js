import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extend: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extend: true }));
app.use(cors({
    origin: "*",
}));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

