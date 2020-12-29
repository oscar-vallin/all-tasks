
import {useDispatch} from 'react-redux';
import {deleteTaskAction, updateTaskAction} from '../../redux/taskDuck';
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
    
    return(
        <li className="task shadow">
            <p>{task.name}</p>
            <div className="state">
                {task.state 
                ? (<button onClick={() => changeState(task)} className="complete">Complete</button>)
                : (<button onClick={() => changeState(task)} className="incomplete">Incomplete</button>)
                 }
            </div>

            <div>
                <label>DeadLine: </label>
                <span>Date</span>
            </div>

            <div>
                <button onClick={() => dispatch(deleteTask(task._id))}>Delete Task</button>
            </div>
        </li>
    );
}

export default Task;