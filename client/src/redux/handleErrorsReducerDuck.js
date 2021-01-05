
const initialState = {
    emailError: null,
    passwordError: null,
    emailExist: null,
};

const SHOW_ERROR_EMAIL = "SHOW_ERROR_EMAIL";
const SHOW_ERROR_PASSWORD = "SHOW_ERROR_PASSWORD";
const HIDE_ERROR = "HIDE_ERROR";
const EMAIL_EXIST = "EMAIL_EXIST";
const NAME_REQUIRED = "NAME_REQUIRED";

export default function reducer(state = initialState, action){
    switch(action.type){
        case SHOW_ERROR_EMAIL:
            return {emailError: action.payload}
        case SHOW_ERROR_PASSWORD:
            return {passwordError: action.payload}  
        case EMAIL_EXIST:
            return {emailExist: action.payload} 
        case NAME_REQUIRED:
            return {nameRequired: action.payload}         
        case HIDE_ERROR:
            return {state: null}    
        default:
            return state;
    };
};


export const showAlertAuthAction = msg => dispatch => {
 
    if(msg === 'user is not exist'){
        dispatch({
            type: SHOW_ERROR_EMAIL,
            payload: msg
        });
    }else{
        dispatch({
        type: SHOW_ERROR_PASSWORD,
        payload: msg
    });
    };

    setTimeout(() => {
        dispatch({type: HIDE_ERROR});
    },2000);

};

export const showAlertUserAction = msg => dispatch => {
    console.log("DOG")

    if(typeof msg === typeof ''){
        dispatch({
            type: EMAIL_EXIST,
            payload: msg
        });
    }else{
        msg.forEach(error => {
           if(error.param === 'password'){
            dispatch({
                type:SHOW_ERROR_PASSWORD,
                payload: error.msg
            });
           }else{
            dispatch({
                type: NAME_REQUIRED,
                payload: error.msg
            });
           }
       });
    };
    
    setTimeout(() => {
        dispatch({type: HIDE_ERROR});
    },2000);
};