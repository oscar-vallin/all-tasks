const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const key = require('../config/keys');

exports.authenticateUser = async (req,res) => {
    const {email,password} = req.body;

    try{
        let user;
    
        user = await User.findOne({email});
    
        if(!user) return res.status(400).json({msg: 'user is not exist'});
    
        const correctPassword = await bcrypt.compare(password, user.password);
    
      
        if(!correctPassword) return res.status(400).json({msg: 'incorrect password'});
      
    
        const payload = {
            user : {
                id: user.id
            }
        };
        jwt.sign(payload,key.secretWord, {
            expiresIn: 3600
        },(error, token) => {
    
            if(error) throw error;
    
            res.json({token});
        })

    }catch(error){
        return res.status(400).json({msg: `there was an error ${req.body}` })
    }

}

exports.getUser = async (req,res) => {
    
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
}