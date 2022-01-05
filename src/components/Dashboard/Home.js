import React from 'react';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';

const Home = () => {
    const { user, dispatchUserEvent, setisAutheticated, setIsAdminRole } = useContext(UserContext);
    const handleSignout = () => {
        dispatchUserEvent(null);
        setisAutheticated(false);
        setIsAdminRole(false);
        localStorage.removeItem('token');
        localStorage.setItem("isLogin", false);
        localStorage.setItem("isLogin", false);

    }
    return (
        <div>
            <h1>This is home page</h1>
            <h2>jwt token is : {user}</h2>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    )
}

export default Home
