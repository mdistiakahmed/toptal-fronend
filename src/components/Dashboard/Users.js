import  { useState, useEffect } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar'
import Clock from '../Cards/Clock'

const pages = ['Home', 'Users']; // Api response will be put in this

const Users = () => {
    const[secondRatio, setSecondRatio] = useState(0);
    const[minuteRatio, setMinuteRatio] = useState(0);
    const[hourRatio, setHourRatio] = useState(0);
    const[myDate, setMyDate] = useState(new Date());


    const setClock = () =>{
        const currentDate = new Date();
         let secondRatio1 = currentDate.getSeconds() / 60;
         let minuteRatio1 = (secondRatio1 + currentDate.getMinutes()) / 60;
         let hourRatio1 = (minuteRatio1 + currentDate.getHours()) / 12;
         setSecondRatio(secondRatio1) ;
         setMinuteRatio(minuteRatio1);
         setHourRatio(hourRatio1);
         setMyDate(currentDate);
      } 

      useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every second!');
            setClock();

         }, 1000);
         return () => clearInterval(interval);  
      },[]);

    const Item = ({item, index}) => {
        return (
            <div className="clock">
                <Clock hourRatio={hourRatio} minuteRatio={minuteRatio} secondRatio={secondRatio} myDate={myDate}/>
           </div>)
    }

    const allQuotes = pages.map((page,index) =>{
        return (
            <Item item={page} key={index} />
        )
    })

    return (
        <div>
            <ResponsiveAppBar />
            {pages.map((page,index) => (
                <Clock hourRatio={hourRatio} minuteRatio={minuteRatio} secondRatio={secondRatio} myDate={myDate}/>
              ))}
            
            <h1>This is Users Page</h1>
        </div>
    )
}

export default Users
