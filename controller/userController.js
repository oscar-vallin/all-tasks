const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = require('../config/keys');
const {validationResult} = require('express-validator');

exports.createUser = async (req,res) => {
   
    const {password, email} = req.body;
    // check user validate
    
    const err = validationResult(req);
    
    if(!err.isEmpty()) return res.status(400).json({err: err.array()});
  
    
    try{
    
        let user;

        user = await User.findOne({email});
        
        if(user) return res.status(400).json({err: "user is already exist"});
        
        user = await User(req.body);
         
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    
        //  user.save((error, document) => {
        //     if(error) {
        //         res.json({msg: error})
        //     }

        //     return res.json({document});
        // });
       await user.save();
        const payload = {
            user : {
                id: user.id
            }
        };
        jwt.sign(payload, key.secretWord, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            //confirm
            res.json({token})
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: `there was an error `});
    }
   
}