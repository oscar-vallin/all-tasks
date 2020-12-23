const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: Date.now()
    },
    createUserTask:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Task', taskSchema);