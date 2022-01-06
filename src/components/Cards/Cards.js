import  { useState, useEffect } from 'react';
import Clock from './Clock'
import './Cards.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

const pages = ['Dhaka', 'Chittagong']; // Api response will be put in this

const Cards = () => {
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
            <div className="cardContainer">
                <p>{item}</p>
                <div className="card" key = {index}>
                    <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '20ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                            <div>
                                <TextField
                                id="outlined-disabled"
                                label="Name"
                                defaultValue="Name"
                                />
                                <TextField
                                disabled
                                id="outlined-disabled"
                                label="City"
                                defaultValue="City"
                                />
                                <TextField
                                disabled
                                id="outlined-disabled"
                                label="Difference to GMT"
                                defaultValue="Difference to GMT"
                                />
                            </div> 
                    </Box>
                    </div>
                    <div>
                        <p>time</p>
                        <p>diffToCurr</p>
                    </div>
                    <div>
                        <Clock hourRatio={hourRatio} minuteRatio={minuteRatio} secondRatio={secondRatio} myDate={myDate}/>
                    </div>
                    
            </div>
            <div className="buttonContainer">
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />}> Delete</Button>
                </Stack>
            </div>
           </div>)
    }

    const allTimes = pages.map((page,index) =>{
        return (
            <Item item={page} key={index} />
        )
    })

    return (
            <div className="row">
                 {allTimes}
            </div>
    )
}

export default Cards

