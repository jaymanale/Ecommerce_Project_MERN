const express = require('express');
const app = express();

const port = 9000;

let isLoggedIn = (req, res, next) => {
  console.log('Yas logged in');
  next();
};

let isAdmin = (req, res, next) => {
  console.log('yes admin');
  next();
};

let home = (req, res) => {
  res.send('Home Page');
};
let admin = (req, res) => {
  res.send('Im  Admin dashboard');
};

app.get('/', home);
app.get('/admin', isLoggedIn, isAdmin, admin);

app.listen(port, () => {
  console.log('server listeninig');
});
