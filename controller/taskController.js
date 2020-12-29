const Task = require('../models/Task');

exports.createTask = async(req,res) => {

    try{
        const task = new Task(req.body);
    
        task.createUserTask = req.user.id
    
        task.save();
       
        res.json(task);
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "there was an error"});
    }
    
}

exports.getTask = async(req,res) => {

    try{
        const task = await Task.find({createUserTask: req.user.id});
    
        res.json({task});
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "There was an error"});
    }
    
}

exports.updateTask = async (req,res) => {

    try{
        const {state} = req.body;

        let task = await Task.findById(req.params.id);
    
        if(!task) return res.status(400).json({msg: 'This task is not exist'});
    
        let newTask = {};
    
        if(state){
            newTask.state = state;
        }else{
            newTask.state = state;
        }
    
        task = await Task.findByIdAndUpdate({_id: req.params.id}, newTask, {new:true});
    
        res.json(task);

    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'there was an error'});
    }
    
}

exports.deleteTask = async (req,res) => {

    try{
        let task = await Task.findByIdAndRemove({_id: req.params.id})
   
        if(!task) return res.status(400).json({msg: 'There is not task'});
    
        res.json({msg: 'Task deleted'});

    }catch(error){
        console.log(error);
        res.status(500).json({msg: 'there eas an error'});
    }
    
}