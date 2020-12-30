const { json } = require('body-parser');
const express = require('express');
const route = express.Router();
const Data = require('../models/Data');


route.post('/', async  (req,res) => {
    
    var data = new Data(req.body);

    await data.save()

      res.json(data);

});

module.exports = route;