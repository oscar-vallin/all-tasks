const express = require('express');
const route = express.Router();

const auth = require('../middleware/auth');

const {authenticateUser, getUser} = require('../controller/authController');

route.post('/', 
    authenticateUser
);

route.get('/',
    auth,
    getUser
)
module.exports = route;