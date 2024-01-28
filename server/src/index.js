const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
require('module-alias/register');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const app = express();

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((e) => console.error(e));

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
