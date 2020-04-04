var express = require('express');
var router = express.Router();
const { signout } = require('../controllers/auth-controller');

router.get('/signout', signout);

module.exports = router;
