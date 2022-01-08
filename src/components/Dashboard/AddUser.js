import React , {useContext} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { UserIdContext } from './Users';
import {omit} from 'lodash';
import { Service } from '../Service/Service';
import { UserContext} from '../Login/context';

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
    const { tokenContext} = useContext(UserContext);
     //Errors
    const [errors, setErrors] = useState('');

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
      console.log();
      res =  await Service.getAllUsers(tokenContext);
      setEmail('');
      setPassword('');
      setIsAdmin(false);
      setRows(res); 
   }


    const handleAdd = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        console.log(isAdmin);
        if(email.length === 0 || password.length === 0) {
          alert('Email or Password field is empty');
          return;
        } else {
          //let res =  await Service.getAllUsers(tokenContext);
          //setRows(res);
          submitAndGetAllUser();
        }
    };

    return (
        <div className={classes.secondContainer} spacing={2} >
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
