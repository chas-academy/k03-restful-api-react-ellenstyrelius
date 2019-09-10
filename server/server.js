const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// body-parser middleware
app.use(bodyParser.json());

console.log('hello this is server :)');
