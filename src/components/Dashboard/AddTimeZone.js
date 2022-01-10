import React, {useState, useContext} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { UserContext} from '../Login/context';
import { Service } from '../Service/Service';
import { InfoModal } from '../Modals/InfoModal';

const useStyles = makeStyles({
    container: {
      display: "grid"
    },
    secondContainer: {
      display: "flex",
      alignItems:"center",
      justifyContent:"center",
      padding:"10px",
      columnGap:"5px"
    }
  });

const AddTimeZone = ({setAllCards}) => {
    const classes = useStyles();
    const [name , setName] = useState('');
    const [city , setCity] = useState('');
    const [hourDiff , setHourDiff] = useState(0);
    const [minDiff , setMinDiff] = useState(0);
    const [nameCityError , setNameCityError] = useState(false);
    const [hourError , setHourError] = useState(false);
    const [minError , setMinError] = useState(false);
    const { tokenContext} = useContext(UserContext);

    const nameCityBlankMsg = 'Name or City Should not be empty';
    const hourRangeViolationMsg = 'Hour Difference should be between -14 to +12';
    const minRangeViolationMsg = 'Hour Difference should be between -14 to +12';

    const submitAndGetAllTimeZones = async()=> {
        let res =  await Service.addNewTimeZone(name,city,hourDiff, minDiff,tokenContext);
        res =  await Service.getUsersTimeZone(tokenContext)
        setAllCards(res);
     }

    const handleAdd = () => {
        if(name.length === 0 || city.length === 0) {
            setNameCityError(true);
            return;
        }

        if(hourDiff<-14 || hourDiff>12) {
            setHourError(true);
            return ;
        }

        if(minDiff<0 || minDiff>59) {
            setMinError(true);
            return ;
        }
         
        
        submitAndGetAllTimeZones();
        setName('');
        setCity('');
        setHourDiff(0);
        setMinDiff(0);
    }

    const handleChange = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;

        switch(name){
            case 'name':
                setName(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'hourDiff':
                setHourDiff(value);
                break;
            case 'minDiff':
                setMinDiff(value);
                break;
            default:
                break;
        }

    }

    return (
        <Box  noValidate   className={classes.container} >
            {nameCityError  && <InfoModal title={nameCityBlankMsg} setCloseModal={setNameCityError}/>}
            {hourError  && <InfoModal title={hourRangeViolationMsg} setCloseModal={setHourError}/>}
            {minError  && <InfoModal title={minRangeViolationMsg} setCloseModal={setMinError}/>}
            <div className={classes.secondContainer} spacing={2} >
                <TextField
                  value={name}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              <TextField
                  value={city}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
                <TextField
                    value={hourDiff}
                    onChange={handleChange}
                    id="hourDiff"
                    label="Hour diff with GMT"
                    type="number"
                    fullWidth
                    name='hourDiff'
                    InputProps={{ inputProps: { min: -14, max: 12 } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    value={minDiff}
                    onChange={handleChange}
                    id="minDiff"
                    label="Minute diff with GMT"
                    type="number"
                    name='minDiff'
                    fullWidth
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAdd}
                    >
                    Add
                </Button>
              </div>
          </Box>
    )
}


export default AddTimeZone
