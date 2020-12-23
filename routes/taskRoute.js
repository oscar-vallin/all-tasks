const express = require('express');
const route = express.Router();
const {check} = require('express-validator');

const {createTask, getTask, updateTask,deleteTask} = require('../controller/taskController');
const auth = require('../middleware/auth');

route.post('/',
    auth,
    [
        check('task', "The task name is necesary").not().isEmpty()
    ],
    createTask
);

route.get('/',
    auth,
    getTask
);

route.put('/:id',
    auth,
    updateTask
);

route.delete('/:id',
    auth,
    deleteTask
)
module.exports = route;