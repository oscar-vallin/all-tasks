import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {userLoginAction} from '../../redux/authReducerDuck';

import './style.css'
const Auth = ({history}) => {

    
    const dispatch = useDispatch();
    const auth = useSelector(data => data.auth);
    

    useEffect(() => {

        if(auth.authenticated){
            history.push('/tasks');
        };

    },[auth.authenticated, history]);

    const [dataUser, getDataUser] = useState({email: '',password: ''});
    const [error, getError] = useState(false);


    const {email, password} = dataUser;

    const onChange = e =>  getDataUser({...dataUser,[e.target.name] : e.target.value});
       
    const onSubmit = e => {
        e.preventDefault();
        
        if(email.trim() === '' || password.trim() === ''){

            return getError({error: true})   
        }
       
        dispatch(userLoginAction(dataUser));
    }
    

    return(
        <div className="form-user">
            <div className="container-form">
                {error ? <p className="alert-error">{auth.message}</p> : null}
                <h1>Log In</h1>
                <form onSubmit={onSubmit}>
                    <div className="camp-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email || ''} name="email" placeholder="email" onChange={onChange}/>
                    </div>
                    <div className="camp-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password || ''} name="password" placeholder="password" onChange={onChange}/>
                    </div>
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