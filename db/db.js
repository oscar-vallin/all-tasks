const mongoose = require('mongoose');
const key = require('../config/keys');

module.exports =  async () => {
    await mongoose.connect(key.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
},() => console.log("DB success"))}

