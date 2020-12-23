const jwt = require('jsonwebtoken');
const {secretWord} = require('../config/dev');

module.exports = (req,res,next) => {

    //read token of header
    const token = req.header('x-auth-token');
    
    if(!token) return res.status(401).json({msg: "There is no token"});

    const encrypt = jwt.verify(token, secretWord);

    req.user = encrypt.user;
    next();
}