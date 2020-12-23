const Task = require('../models/Task');

exports.createTask = async(req,res) => {

    
    let task = await Task(req.body);
    
    task.createUserTask = req.user.id

    await task.save();
   
    res.json(task)
}

exports.getTask = async(req,res) => {

    const task = await Task.find({createUserTask: req.user.id});
    
    res.json({task})
}

exports.updateTask = async (req,res) => {

    const {state} = req.body;

    let task = await Task.findById(req.params.id);

    if(!task) return res.status(400).json({msg: 'There is no task'});

    let newTask = {};

    if(state){
        newTask.state = state;
    }else{
        newTask.task = task
    }

    task = await Task.findByIdAndUpdate({_id: req.params.id}, newTask, {new:true});

    res.json(task);
}

exports.deleteTask = async (req,res) => {

    let task = await Task.findByIdAndRemove({_id: req.params.id})

    if(!task) return res.status(400).json({msg: 'There is not task'});

    res.json({msg: 'Task deleted'});
}