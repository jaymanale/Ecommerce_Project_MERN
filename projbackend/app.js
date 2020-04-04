require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
let app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('** DB CONNECTED **'))
  .catch((err) => console.log('Error: ', err));

//Listen to express port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`** Server listening at ${port} **`);
});
