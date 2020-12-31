import axios from 'axios';
import tokenAuth from '../config/token';

const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: null,
    fetching: true
};

const USER_SUCCESS = "USER_SUCCESS";
const USER_ERROR  = "USER_ERROR";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT"; 
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_ERROR = "LOGIN_ERROR";


export default function reducer(state = initialState, action){
    switch(action.type){
        case USER_SUCCESS:
        case LOGIN_SUCCESS:    
            localStorage.setItem('token', action.payload.token);
            return {...state, fetching: false, authenticated: true, message: null };
        case GET_USER:
            return {...state, user: action.payload, fetching: false, authenticated: true}; 
        case USER_ERROR:
        case LOGIN_ERROR:    
        case LOG_OUT:
            localStorage.removeItem('token');
            return {...state, token: null, fetching: false, authenticated: null, user: null, message: action.payload}     
        default:
            return state;
    };
};


export const createUserAction = data => async dispatch => {

 
    try {
        const response = await axios.post('/api/users', data);

        dispatch({
            type: USER_SUCCESS,
            payload: response.data
        });
    
        authenticatedUserActions()(dispatch);
    } catch (error) {
        console.log(error.response.data.err)
        dispatch({
            type: USER_ERROR,
            payload: error.response.data.err
        })
    }
    
}

export const authenticatedUserActions = () => async dispatch => {
    
    const token = localStorage.getItem('token');

    if(token) tokenAuth(token);

    try {
        const response = await axios.get('/api/auth');
    
        dispatch({
            type: GET_USER,
            payload: response.data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

export const userLoginAction = user => async dispatch => {

    try {
        
        const response = await axios.post('/api/auth', user);
       
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
        authenticatedUserActions()(dispatch);

    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })
    }
}

export const logoutAction = () => dispatch => {
    dispatch({
        type: LOG_OUT,
    })
}