import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AuthUser from './components/auth/Login';
import CreateUser from './components/auth/CreateUser';
import Project from './components/project/Project';

// import PrivateRoute from './components/routes/PrivateRoute';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthUser} />
        <Route exact path="/create-user" component={CreateUser} />
        <Route exact path="/tasks" component={Project} />        
      </Switch>
    </Router>

  );
}

export default App;
