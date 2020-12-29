import axios from 'axios';


const initialState = {
    tasks: [],
    showTask: false,
    showError: false,
    hideTask: true,
};

const ADD_TASK = "ADD_TASK";
const TASK_ERROR = "TASK_ERROR";
const GET_TASKS = "GET_TASKS";
const DELETE_TASK = "DELETE_TASK"
const UPDATE_TASK = "UPDATE_TASK";
const HIDE_TASK = "HIDE_TASK";

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_TASKS: 
            return {...state, tasks: action.payload} 
        case ADD_TASK:
            return {...state, tasks : [...state.tasks, action.payload], showError: false}     
        case DELETE_TASK:
            return {...state, tasks: state.tasks.filter(task => task.id !== action.payload)} 
        case UPDATE_TASK:
            return {...state, tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)} 
        case TASK_ERROR:
            return {...state, showError: true}     
        case HIDE_TASK:
            return {tasks: []}         
        default:
            return state;
    }
};

export const addTaskAction = task => async dispatch => {

    try{

        const response = await axios.post('/api/task', task);
      
        dispatch({
            type: ADD_TASK,
            payload: response.data
        });

    }catch(error){
        console.log(error);
    };
};

export const getTaskAction = () => async dispatch => {
    
    try {
        
        const response = await axios.get('/api/task');
        
        dispatch({
            type: GET_TASKS,
            payload: response.data.task
        });

    } catch (error) {
        console.log(error);
    }
}

export const errorTaskAction = () => dispatch => dispatch({type: TASK_ERROR})

export const deleteTaskAction = id => async dispatch => {

    try {
        
        await axios.delete(`/api/task/${id}`);

        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateTaskAction = task => async dispatch => {

    try {
        
        const response = await axios.put(`/api/task/${task._id}`, task);
   
        dispatch({
            type: UPDATE_TASK,
            payload: response.data
        });
  
    } catch (error) {
        console.log(error);
    }  
};

export const hideTaskAction = () => dispatch => {

    dispatch({type: HIDE_TASK});
}