import './App.css';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './components/Dashboard/Home';
import Users from './components/Dashboard/Users';
import Unauthorized from './components/Dashboard/Unauthorized';
import UserGuardedRoute from './components/Login/UserGuardedRoute';
import AdminGuardedRoute from './components/Login/AdminGuardedRoute';
import { UserContext } from './components/Login/context';
import { useAuth } from './hooks/useAuth';
import { Roles, useRole } from './hooks/useRole';
import {useToken} from './hooks/useToken'

function App() {
  const { getToken} = useToken();
  const [ tokenContext, setTokenContext ] = useState(getToken());

  const isAuthenticated  = useAuth();
  const userRole = useRole();
  const isAdmin = userRole === Roles.ROLE_ADMIN;

  return (
    <UserContext.Provider value={{ tokenContext, setTokenContext }}>
      <div className="App">
        <Router>
          <Switch>
            <UserGuardedRoute path='/' component={Home} auth={isAuthenticated} exact/>
            <UserGuardedRoute path='/unauthorized' component={Unauthorized} auth={isAuthenticated}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <AdminGuardedRoute path='/users' component={Users} auth={isAuthenticated  && isAdmin} />
            
          </Switch>
        </Router>
      </div>
      </UserContext.Provider>
  );
}

export default App;
