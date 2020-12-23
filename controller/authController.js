const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {secretWord} = require('../config/dev');

exports.authenticateUser = async (req,res) => {
    const {email,password} = req.body;

    let user;

    user = await User.findOne({email});

    if(!user) return res.status(400).json({msg: 'The user is not exist'});

    const correctPassword = await bcrypt.compare(password, user.password);

    console.log(correctPassword);
    if(!correctPassword) return res.status(400).json({msg: 'This password is incorrect'});
  

    const payload = {
        user : {
            id: user.id
        }
    };
    jwt.sign(payload,secretWord, {
        expiresIn: 3600
    },(error, token) => {

        if(error) throw error;

        res.json({token});
    })

}

exports.getUser = async (req,res) => {
    
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
}