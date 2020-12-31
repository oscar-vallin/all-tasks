import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {userLoginAction} from '../../redux/authReducerDuck';

import './style.css'
const Auth = ({history}) => {

    
    const dispatch = useDispatch();
    const auth = useSelector(data => data.auth);
    
    const [dataUser, getDataUser] = useState({email: '',password: ''});
    const [showError, getShowError] = useState({passwordError: false, userError: false});

    const {email, password} = dataUser;
    const {passwordError, userError} = showError;
    
    useEffect(() => {

        if(auth.authenticated){
            history.push('/tasks');
        };
        
       if(auth.message){
           if(auth.message[0] === 'u'){
               getShowError({userError: true});
           }else{
               getShowError({passwordError: true});
           }
       };
       
    },[auth.authenticated, history,auth.message]);

    

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
                       { userError ? <i className="material-icons">error</i> : null}
                    </div>
                    {userError ? <p className="user-incorrect">invalid email</p> : null}
                    <div className="camp-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password || ''} name="password" placeholder="password" onChange={onChange}/>
                       {passwordError ?  <i className="material-icons prefix">error</i>: null}
                    </div>
                    {passwordError ? <p className="password-incorrect">password incorrect</p> : null}
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