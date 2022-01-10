import React , {useContext} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Service } from '../Service/Service';
import { UserContext} from '../Login/context';
import {InfoModal} from '../Modals/InfoModal';

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

const AddUser = ({rows,setRows}) => {
    const classes = useStyles();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isAdmin , setIsAdmin] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { tokenContext} = useContext(UserContext);

    const errorMsg = 'Email or Password Should Not Be Empty'

    const onEmailChange =(e) => {
      e.preventDefault()
      setEmail(e.target.value)
    }

    const onPasswordChange =(e) => {
      e.preventDefault()
      setPassword(e.target.value)
    }

    const submitAndGetAllUser = async()=> {
      let res =  await Service.addNewUser(email,password,isAdmin, tokenContext);
      res =  await Service.getAllUsers(tokenContext);
      setEmail('');
      setPassword('');
      setIsAdmin(false);
      setRows(res); 
   }


    const handleAdd = (e) => {
        e.preventDefault();
        if(email.length === 0 || password.length === 0) {
          setHasError(true);
          return;
        } else {
          submitAndGetAllUser();
        }
    };

    return (
        <div className={classes.secondContainer} spacing={2} >
          {hasError && <InfoModal title={errorMsg} setCloseModal={setHasError}/> }
          
                <TextField
                  value={email}
                  onChange={onEmailChange}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                />
              <TextField
                  value={password}
                  onChange={onPasswordChange}
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                />
                <FormControlLabel
                    control={<Switch checked={isAdmin} onChange={()=> setIsAdmin(!isAdmin)} />}
                    label="Admin User"
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
    )
}

export default AddUser
