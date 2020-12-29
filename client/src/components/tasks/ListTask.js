import React from 'react';

import Task from './Task';

import {useDispatch, useSelector} from 'react-redux';
import {getTaskAction, hideTaskAction} from '../../redux/taskDuck';
const ListTask = () => {

    const dispatch = useDispatch();
    const getTasks = useSelector( state => state.task);

    const tasksArray = getTasks.tasks
  
    const showTasks = () => dispatch(getTaskAction());
    
    return(
        <div>
            <h2>Tasks</h2>
            <button onClick={() => showTasks()} className="btn btn-secundary">Get Tasks</button>
            <button onClick={() => dispatch(hideTaskAction())} className="btn btn-secundary">Hide Tasks</button>
            <ul>
                {tasksArray.length === 0 && !getTasks.showTask
                    ? null
                    :
                tasksArray.map(task => (
                    <Task 
                        key={task._id}
                        task={task}
                    />
                ))}   
            </ul>
        </div>
    )
}
export default ListTask;