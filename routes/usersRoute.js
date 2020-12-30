const express = require('express');
const route = express.Router();
const {check} = require('express-validator');

const {createUser} = require('../controller/userController');


route.post('/',
  
    [
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'must add a valid email').isEmail(),
        check('password', 'your password must be at leats 6 characters').isLength({min: 6})
    ],
    createUser
);

module.exports = route;