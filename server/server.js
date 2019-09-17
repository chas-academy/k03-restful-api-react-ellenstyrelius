const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// load dotenv to read from .env file
dotenv.config();

// import API routes
const productsRoute = require('./routes/api/products');

const app = express();

// use body-parser middleware
app.use(bodyParser.json());

// database config - get uri to MongoDB from .env
const db = process.env.DB_URI;

// connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

// use API routes
app.use('/api/products', productsRoute);

//define which port should be used
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
