import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {userLoginAction} from '../../redux/authReducerDuck';
import {showAlertAuthAction} from '../../redux/handleErrorsReducerDuck'

import './style.css'
const Auth = ({history}) => {

    
    const dispatch = useDispatch();
    const auth = useSelector(data => data.auth);
    const error = useSelector(data => data.error);
    
    const [dataUser, getDataUser] = useState({email: '',password: ''});

    const {email, password} = dataUser;
   
    useEffect(() => {

        if(auth.authenticated){
            history.push('/tasks');
        };
        
       if(auth.message){
           dispatch(showAlertAuthAction(auth.message));
       };

       
    },[auth.authenticated, history,auth.message,dispatch]);

    

    const onChange = e =>  getDataUser({...dataUser,[e.target.name] : e.target.value});
       
    const onSubmit = e => {
        e.preventDefault();
        
        dispatch(userLoginAction(dataUser));
    };
    
  
    return(
        <div className="form-user">
            <div className="container-form">
                <h1>Log In</h1>
                <form onSubmit={onSubmit}>
                    <div className="camp-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email || ''} name="email" placeholder="email" onChange={onChange}/>
                       { error.emailError &&  <i className="material-icons">error</i> }
                    </div>
                    {error.emailError &&  <p className="user-incorrect">invalid email</p> }
                    <div className="camp-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password || ''} name="password" placeholder="password" onChange={onChange}/>
                       {error.passwordError && <i className="material-icons prefix">error</i>}
                    </div>
                    {error.passwordError  && <p className="password-incorrect">password incorrect</p>}
                    <div className="camp-form">
                        <input type="submit" value="Log In" />
                    </div>
                </form>
                <Link to="/create-user" className="account-link">
                    Create User
                </Link>
            </div>
        </div>
    );
}

export default Auth;