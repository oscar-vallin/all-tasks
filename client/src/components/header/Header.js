import React, {useEffect} from 'react';
import './style.css'

import {useDispatch, useSelector} from 'react-redux';
import {logoutAction, authenticatedUserActions} from '../../redux/authReducerDuck';

const Header = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(authenticatedUserActions());
    },[dispatch]);


    const logOut = () => dispatch(logoutAction());
    return(
        <header className="app-header">
           { auth.user ?  <p className="user-name">Hello <span>{auth.user.name}</span></p> : null}
            <nav className="main-nav">
                 <button onClick={logOut} className="btn btn-blank sign-off">Log Out</button>
            </nav>
        </header>
    );
}

export default Header;