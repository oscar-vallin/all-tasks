const express = require('express');
const route = express.Router();

const {createUser} = require('../controller/userController');

route.post('/', createUser);

module.exports = route;