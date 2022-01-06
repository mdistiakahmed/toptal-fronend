import  { useState } from 'react';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';
import {useToken} from '../../hooks/useToken';
import ResponsiveAppBar from './ResponsiveAppBar';
import Cards from '../Cards/Cards';


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
            <Cards />   
            <h1>This is home page</h1>
        </div>
    )
}

export default Home
