require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// middleware imports
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

// mongoDB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('** DB CONNECTED **'))
  .catch((err) => console.log('Error: ', err));

// Middleware goes here
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Listen to express port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`** Server listening at ${port} **`);
});
