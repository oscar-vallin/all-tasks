const { json } = require('body-parser');
const express = require('express');
const route = express.Router();
const Data = require('../models/Data');


route.post('/', (req,res) => {
    
    var data = new Data(req.body);

    data.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });

      res.json(data);

});

module.exports = route;