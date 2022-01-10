import  { useState, useEffect } from 'react';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import Cards from '../Cards/Cards';
import AddTimeZone from './AddTimeZone';
import { Service } from '../Service/Service';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Roles, useRole } from '../../hooks/useRole';

const useStyles = makeStyles({
    Container: {
      display: "flex",
      alignItems:"center",
      justifyContent:"flex-end",
      margin:"0px",
    }
});


const Home = () => {

    const [allCards, setAllCards] =  useState([]);
    const { tokenContext } = useContext(UserContext);
    const [showAllData, setShowAllData] =  useState(false);
    const classes = useStyles();
    const userRole = useRole();
    const isAdmin = userRole === Roles.ROLE_ADMIN;

    const getCurrentUsersCard= async()=> {
        let res =  await Service.getUsersTimeZone(tokenContext);
        setAllCards(res); 
     }

     const loadAllData= async()=> {
        let res =  await Service.getAllTimeZone(tokenContext);
        setAllCards(res); 
     }
    

    const onShowBtnClick = () => {
        if(!showAllData) {
            loadAllData();
        } else {
            getCurrentUsersCard();
        }
        setShowAllData(!showAllData);
            
    }

    useEffect(() => {
        getCurrentUsersCard();
          
    },[]);


    return (
        <div>
            <ResponsiveAppBar setAllCards={setAllCards} />
            <AddTimeZone setAllCards={setAllCards}/>
            {isAdmin && 
            <div className={classes.Container}>
                <Button
                    style={{margin:'0px',paddingTop:'0px',paddingBottom:'0px'}}
                    variant={showAllData? "contained" : "outlined"}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onShowBtnClick}
                    >
                    All Data
                </Button>
            </div>
            }
            <Cards allCards={allCards} setAllCards={setAllCards}/>   
            
        </div>
    )
}

export default Home
