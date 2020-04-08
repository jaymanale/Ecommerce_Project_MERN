require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// middleware imports
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// my routes
const authRoutes = require('./routes/auth-route');
const userRoutes = require('./routes/user-route');
const cateoryRoutes = require('./routes/category-route');
const productRoutes = require('./routes/product-route');
const orderRoutes = require('./routes/order-route');
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

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', cateoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

//Listen to express port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`** Server listening at ${port} **`);
});
