
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({path, component, ...rest}) => {

    const auth = useSelector(state => state.auth);
    const token = localStorage.getItem('token')

    if(token || auth.authenticated){
        return <Route path={path} component={component} {...rest}/>
    }else{
        return <Redirect to="/" {...rest}/>
    }

    
}

export default PrivateRoute;