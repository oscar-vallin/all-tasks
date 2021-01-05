import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import {createUserAction} from '../../redux/authReducerDuck';
import {showAlertUserAction} from '../../redux/handleErrorsReducerDuck';

import './style.css';

const CreateUser = ({history}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const error = useSelector(state => state.error);


    const [createUser, setCreateUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [confirmPasswordError, showHandleErrors] = useState(false);

    const {name, email, password, confirmPassword} = createUser;

    useEffect(() => {
        if(auth.authenticated){
            history.push('/tasks')
        }
        
        if(auth.message){
           dispatch(showAlertUserAction(auth.message));
        }
    },[history,auth,dispatch,confirmPassword])

    const onChange = e => setCreateUser({...createUser,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if(password !== confirmPassword){
            return showHandleErrors({confirmPassword: true});
        }
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
                        {error.nameRequired ?  <i className="material-icons prefix">error</i>: null}
                    </div>
                    {error.nameRequired  && <p className="password-incorrect">the name is required</p>}
                    <div className="camp-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email || ''} name="email" id="email" placeholder="email" onChange={onChange}/>
                        {error.emailExist &&   <i className="material-icons prefix">error</i>}
                    </div>
                    {error.emailExist && <p className="password-incorrect">{error.emailExist}</p>}
                    <div className="camp-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password || ''} name="password" id="password" placeholder="password" onChange={onChange}/>
                        {error.passwordError && <i className="material-icons prefix">error</i>}
                    </div>
                    {error.passwordError && <p className="password-incorrect">password must be at leats 6 characters</p>}
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
