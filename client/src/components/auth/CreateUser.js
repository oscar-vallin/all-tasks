import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import {createUserAction} from '../../redux/authReducerDuck';

import './style.css';

const CreateUser = ({history}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    const [createUser, setCreateUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [handleErrors, showHandleErrors] = useState({
        confirmPasswordError: false,
        getPassword: true,
        validEmail: false,
    });

    const {name, email, password, confirmPassword} = createUser;
    const {confirmPasswordError, getPassword, validEmail} = handleErrors;

    useEffect(() => {
        if(auth.authenticated){
            history.push('/tasks')
        }
        auth.message = null;
        if(typeof auth.message === typeof '') return showHandleErrors({validEmail: true});
        if(auth.message !== ''){
            if(password.length > 5){
                showHandleErrors({getPassword: false});
            }else{
                showHandleErrors({getPassword: true});
            }
        }
    },[history,auth, password])

    const onChange = e => setCreateUser({...createUser,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        
        if(password !== confirmPassword) return showHandleErrors({confirmPasswordError: true});
        
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
                        {!name ?  <i className="material-icons prefix">error</i>: null}
                    </div>
                    <div className="camp-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email || ''} name="email" id="email" placeholder="email" onChange={onChange}/>
                        {validEmail ?  <i className="material-icons prefix">error</i>: null}
                    </div>
                    {validEmail ? <p className="password-incorrect">{auth.message}</p> : null}
                    <div className="camp-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password || ''} name="password" id="password" placeholder="password" onChange={onChange}/>
                        {getPassword ?  <i className="material-icons prefix">error</i>: null}
                    </div>
                    {getPassword ? <p className="password-incorrect">password must be at leats 6 characters</p> : null}
                    <div className="camp-form">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" value={confirmPassword || ''} name="confirmPassword" id="confirmPassword" placeholder="confirm password" onChange={onChange}/>
                        {confirmPasswordError ?  <i className="material-icons center">error</i>: null}
                    </div>
                    {confirmPasswordError ? <p className="password-incorrect">The password does not match</p> : null}
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
