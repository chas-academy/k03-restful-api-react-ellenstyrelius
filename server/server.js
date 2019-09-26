const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

// load dotenv package to immediately read from .env file
dotenv.config();

const app = express();

// use body-parser middleware
app.use(express.json());

// database config - get uri with username and password to MongoDB from .env
const db = process.env.DB_URI;

// connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

// enable Cross Origin Resource Sharing
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://tinglingtints.netlify.com'
  ];
  const reqOrigin = req.headers.origin;
  allowedOrigins.map(origin => {
    if (reqOrigin === origin) {
      res.header('Access-Control-Allow-Origin', reqOrigin);
    }
  });
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// import and use API routes
app.use('/api/products', require('./routes/api/products'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/auth', require('./routes/api/auth'));

// define which port should be used, for Heroku deploy and locally
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
