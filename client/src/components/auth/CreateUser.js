import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import {createUserAction} from '../../redux/authReducerDuck';

import './style.css';

const CreateUser = ({history}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if(auth.authenticated){
            history.push('/tasks')
        }
    },[history,auth])

    const [createUser, setCreateUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {name, email, password, confirmPassword} = createUser;

    const onChange = e => setCreateUser({...createUser,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
            return alert("All the files ares required");
        }
        if(confirmPassword !== password) return alert('The password do not masth');
        dispatch(createUserAction(createUser));
    }

  
    return(
        <div className="form-user" onSubmit={onSubmit}>
            <div className="container-form">
                <h1>Create User</h1>
                <form>
                    <div className="camp-form">
                        <label htmlFor="user">User Name</label>
                        <input type="text" value={name || ''} name="name" id="user" placeholder="user name" onChange={onChange}/>
                    </div>
                    <div className="camp-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email || ''} name="email" id="email" placeholder="email" onChange={onChange}/>
                    </div>
                    <div className="camp-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password || ''} name="password" id="password" placeholder="password" onChange={onChange}/>
                    </div>
                    <div className="camp-form">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" value={confirmPassword || ''} name="confirmPassword" id="confirmPassword" placeholder="confirm password" onChange={onChange}/>
                    </div>
                    <div className="camp-form">
                        <input type="submit" value="Sig In"/>
                    </div>
                </form>
                <Link to="/" className="account-link">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default CreateUser;
