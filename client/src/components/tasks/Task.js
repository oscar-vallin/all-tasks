
import {useDispatch} from 'react-redux';
import {deleteTaskAction, updateTaskAction} from '../../redux/taskReducerDuck';
import './style.css';

const Task = ({task}) => {
    
    const dispatch = useDispatch();



    const changeState = task => {
        if(task.state){
            task.state = false;
        }else{
            task.state = true
        }

        dispatch(updateTaskAction(task));
    };

    const deleteTask = id => deleteTaskAction(id);

    let date = new Date(task.dueDate)
    let dateTask = date.toDateString()
    return(
        <li className="task shadow">
            <p>{task.name}</p>
            <div className="state">
                {task.state 
                ? (<button onClick={() => changeState(task)} className="complete">Complete</button>)
                : (<button onClick={() => changeState(task)} className="complete">Incomplete</button>)
                 }
            </div>

            <div>
                <label>Task for the day: </label>
                <span>{dateTask}</span>
            </div>

            <div>
                <button onClick={() => dispatch(deleteTask(task._id))} className="btn delete-task">Delete Task</button>
            </div>
        </li>
    );
}

export default Task;