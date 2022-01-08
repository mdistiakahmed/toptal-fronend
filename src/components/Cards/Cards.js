import  { useState, useEffect, useContext } from 'react';
import Clock from './Clock'
import './Cards.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import { Service } from '../Service/Service';
import { UserContext} from '../Login/context';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const pages = ['Dhaka', 'Chittagong']; // Api response will be put in this

const Cards = ({allCards,setAllCards}) => {

    console.log('In cards');
    console.log(allCards);

    const x = allCards.map((page,index) =>{
        console.log('HI');
        console.log(page);
    })
   
    
    const allTimes = allCards.map((page,index) =>{
        return (
            <Item item={page} key={index} setAllCards={setAllCards} />
        )
    })

    return (
        <div className="row">
            {allTimes}
        </div>
    )
}

const Item = ({item, index,setAllCards }) => {
    const { tokenContext} = useContext(UserContext);
    const [name , setName] = useState(item.name);
    const [city , setCity] = useState(item.city);
    const [hourDiff , setHourDiff] = useState(item.hourdiff);
    const [minDiff , setMinDiff] = useState(item.mindiff);
    const [isEdit , setIsEdit] = useState(false);
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [editSaveModal , setEditSaveModal] = useState(false);
    const deleteModalTitle = 'Sure you want to delete : ' + item.name + ' ?';
    const editFailedMsg = 'Name or City Should not be empty';
    const onNameChange =(e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const onCityChange =(e) => {
        e.preventDefault()
        setCity(e.target.value)
    }
    const onHourDiffChange =(e) => {
        e.preventDefault()
        setHourDiff(e.target.value)
    }

    const onMinDiffChange =(e) => {
        e.preventDefault()
        setMinDiff(e.target.value)
    }

    const onCancelEdit =() => {
        setName(item.name);
        setCity(item.city);
        setHourDiff(item.hourdiff);
        setMinDiff(item.mindiff);
        setIsEdit(!isEdit);
    }


    const deleteAndReload = async()=> {
        let res =  await Service.deleteTimeZone(item.id,tokenContext);
        res =  await Service.getUsersTimeZone(tokenContext)
        setAllCards(res);  
     }


    const handleDelete = () => {
        //deleteAndReload();
        setShowDeleteModal(true);
    }

    const editAndReload = async()=> {
        let res =  await Service.updateTimeZone(item.id, name, city, hourDiff,minDiff, tokenContext);
        res =  await Service.getUsersTimeZone(tokenContext)
        setAllCards(res);  
    }

    const handleEditSaveButton = () => {
        if(name.length === 0 || city.length === 0) {
            setEditSaveModal(true);
            return;
        }
        editAndReload();
        setIsEdit(false)
        
    }


    return (
        <div className="cardContainer">
            <p>{item.name}</p>
            {showDeleteModal && <ConfirmationModal title={deleteModalTitle} yesAction={deleteAndReload} noAction={setShowDeleteModal}/>}
            {editSaveModal  && <InfoModal title={editFailedMsg} setCloseModal={setEditSaveModal}/>}
            <div className="card" key = {index}>
                <div>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '20ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <div className="secondContainer">
                            <TextField
                                value={isEdit? name : item.name}
                                onChange={onNameChange}
                                label="Name"
                            />
                            <TextField
                                value={isEdit? city : item.city}
                                onChange={onCityChange}
                                label="City"
                            />
                            <TextField
                                value={isEdit? hourDiff : item.hourdiff} 
                                onChange={onHourDiffChange}
                                label="Hour Diff to GMT"
                                type="number"
                                InputProps={{ inputProps: { min: -14, max: 12 } }}
                            />
                            <TextField
                                value={isEdit? minDiff : item.mindiff} 
                                onChange={onMinDiffChange}
                                label="Minute Diff to GMT"
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 59 } }}
                            />
                        </div>

                </Box>
                </div>
                <ClockSection item={item}/>
        </div>
        <div className="buttonContainer">
            <Stack direction="row" spacing={2}>
                {!isEdit && <Button onClick={()=> setIsEdit(!isEdit)} variant="outlined" startIcon={<EditIcon />}>Edit</Button>}
                {isEdit && <Button onClick={handleEditSaveButton} variant="contained" startIcon={<SaveIcon />}>Save</Button>}
                {isEdit && <Button onClick={onCancelEdit } variant="outlined" startIcon={<CancelIcon />}>Cancel</Button>}
                <Button onClick={handleDelete} variant="outlined" startIcon={<DeleteIcon style={{fill: "red"}}/>}> Delete</Button>
            </Stack>
        </div>
       </div>
    )
}



const ClockSection = ({item }) => {
    const[secondRatio, setSecondRatio] = useState(0);
    const[minuteRatio, setMinuteRatio] = useState(0);
    const[hourRatio, setHourRatio] = useState(0);
    const[digiTime, setDigiTime] = useState('');
    const[diff, setDiff] = useState('');


    const hourDiff = item.hourdiff;
    const minDiff = item.mindiff;
    let offset = Math.abs(hourDiff) * 3600 * 1000 + minDiff * 60 * 1000;
    if(hourDiff < 0) {
        offset = offset * (-1);
    }


    const setClock = () =>{
        const currentDate = new Date();
        const convertedDate = new Date(currentDate.getTime() + currentDate.getTimezoneOffset()*60 * 1000 + offset);
         let secondRatio1 = convertedDate.getSeconds() / 60;
         let minuteRatio1 = (secondRatio1 + convertedDate.getMinutes()) / 60;
         let hourRatio1 = (minuteRatio1 + convertedDate.getHours()) / 12;
         setSecondRatio(secondRatio1) ;
         setMinuteRatio(minuteRatio1);
         setHourRatio(hourRatio1);
         setDigiTime(convertedDate.getHours() + " : " + convertedDate.getMinutes() + " : " + convertedDate.getSeconds());
    
         let diffBetweenBrowserTime =  (convertedDate - currentDate);// in milli
         const hh = Math.floor(Math.abs(diffBetweenBrowserTime) / 3600000);
         diffBetweenBrowserTime = Math.abs(diffBetweenBrowserTime) - (hh * 3600000);
         const mm = Math.floor(diffBetweenBrowserTime/ 60000);
         if(diffBetweenBrowserTime < 0) hh = hh * (-1);
         setDiff(hh+ " : " + mm + " (hh:mm)");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setClock();
        }, 1000);
        return () => clearInterval(interval);  
    },[]);

    return (
        <div className="card">
            <div>
                <Clock hourRatio={hourRatio} minuteRatio={minuteRatio} secondRatio={secondRatio} digiTime={digiTime} diff={diff}/>
            </div>
        </div>
    )
}


const ConfirmationModal = ({title, yesAction, noAction}) => {
    const[open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        noAction(false);
    };

    const handleYesClick = () => {
        noAction(false);
        yesAction();
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirmation !"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => noAction(false) }>No</Button>
                <Button onClick={handleYesClick} autoFocus> Yes </Button>
        </DialogActions>
    </Dialog>
    )
}


const InfoModal = ({title, setCloseModal}) => {
    const[open, setOpen] = useState(true);

    const handleOk = () => {
        setOpen(false);
        setCloseModal(false);
    }
    return (
        <Dialog
            open={open}
            onClose={handleOk}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Hey !"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>Got it</Button>
        </DialogActions>
    </Dialog>
    )
}


export default Cards