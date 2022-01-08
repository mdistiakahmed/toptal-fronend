import  { useState, useEffect } from 'react';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';
import {useToken} from '../../hooks/useToken';
import ResponsiveAppBar from './ResponsiveAppBar';
import Cards from '../Cards/Cards';
import AddTimeZone from './AddTimeZone';
import { Service } from '../Service/Service';


function valuetext(value) {
    return `${value}GMT`;
}



const Home = () => {

    const [allCards, setAllCards] =  useState([]);
    const { tokenContext,setTokenContext } = useContext(UserContext);
    const { removeToken , getToken} = useToken();

    const getCurrentUsersCard= async()=> {
        let res =  await Service.getUsersTimeZone(tokenContext);
        setAllCards(res); 
     }

    useEffect(() => {
        getCurrentUsersCard();
          
    },[]);

    return (
        <div>
            <ResponsiveAppBar setAllCards={setAllCards} />
            <AddTimeZone setAllCards={setAllCards}/>
            <Cards allCards={allCards} setAllCards={setAllCards}/>   
            
        </div>
    )
}

export default Home
