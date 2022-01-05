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

function App() {
  const[isAutheticated, setisAutheticated] = useState(JSON.parse(localStorage.getItem("isLogin")));
  const[isAdminRole, setIsAdminRole] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const [ user, setUser ] = useState(localStorage.getItem("token"));
	const dispatchUserEvent = (userId) => {
		setUser(userId)
        console.log(userId);
	};
  return (
    <UserContext.Provider value={{ user, dispatchUserEvent, setisAutheticated, setIsAdminRole }}>
      <div className="App">
        <Router>
          <Switch>
            <UserGuardedRoute path='/' component={Home} auth={isAutheticated} exact/>
            <UserGuardedRoute path='/unauthorized' component={Unauthorized} auth={isAutheticated}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <AdminGuardedRoute path='/users' component={Users} auth={isAdminRole} />
            
          </Switch>
        </Router>
      </div>
      </UserContext.Provider>
  );
}

export default App;
