require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { router } from './routes';

// import {connectDB} from './models/db'
// connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
