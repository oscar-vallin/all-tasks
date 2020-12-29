import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addTaskAction, errorTaskAction} from '../../redux/taskDuck';

import './style.css'

const FormTask = () => {

    const dispatch = useDispatch();
    const useTask = useSelector(({task}) => task);

    const [task, saveTask] = useState({name: '', dueTime: ''});

    const {name, dueTime} = task;

    const onChange = e => saveTask({...task,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if(name.trim() === '' || dueTime.trim() === ''){
            return dispatch(errorTaskAction());
        }

        dispatch(addTaskAction(task));

        saveTask({name: '', dueTime: ''});
    }
    return(
        <div className="form">
            <form onSubmit={onSubmit}>
                <div className="container-input">
                <input 
                    type="text" 
                    name="name"
                    value={name}
                    className="input-text"
                    placeholder="Add new Task"
                    onChange={onChange}
                    />
                </div>
                <div className="input-date">
                <label>Date</label>    
                <input 
                    type="date"
                    name="dueTime"
                    className="input-date"
                    value={dueTime}
                    onChange={onChange}
                />
                </div>
                <div className="container-input">
                    <input type="submit" value="Add Task" className="btn"/>
                </div>
            </form>
            {useTask.showErro ? <p>There was an error</p>: null}
        </div>
    )
}

export default FormTask;