import  { useState } from 'react';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';
import {useToken} from '../../hooks/useToken';
import ResponsiveAppBar from './ResponsiveAppBar';


const Home = () => {
    const { setTokenContext } = useContext(UserContext);
    const { removeToken , getToken} = useToken();
    const handleSignout = () => {
        removeToken();
        setTokenContext(null);
    }

    

    return (
        <div>
            <ResponsiveAppBar />
            
            <h1>This is home page</h1>
            <h2>jwt token is : {getToken()}</h2>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    )
}

export default Home
