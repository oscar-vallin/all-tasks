const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: String,
    lastName: String
});

module.exports = mongoose.model('Data', dataSchema);