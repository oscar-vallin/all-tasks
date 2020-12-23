const jwt = require('jsonwebtoken');
const key = require('../config/keys');

module.exports = (req,res,next) => {

    //read token of header
    const token = req.header('x-auth-token');
    
    if(!token) return res.status(401).json({msg: "There is no token"});

    const encrypt = jwt.verify(token, key.secretWord);

    req.user = encrypt.user;
    next();
}