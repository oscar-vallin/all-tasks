import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './authReducerDuck';
import taskReducer from './taskDuck';

const alltReucer = combineReducers({
    task: taskReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    let store = createStore(
        alltReucer,
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}