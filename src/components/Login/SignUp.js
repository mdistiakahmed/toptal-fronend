import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useHistory } from "react-router-dom";
import axios from 'axios';
import  { useState } from 'react';
import {omit} from 'lodash';
import {InfoModal} from './../Modals/InfoModal'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const[showAlert, setShowAlert] = useState(false);
  const[password, setPassword] = useState('');
  //Errors
  const [errors, setErrors] = useState({});
  

  const validate = (name, value) => {
    switch (name) {
        case 'email':
            if(
                !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
            ){
                setErrors({
                    ...errors,
                    email:'Enter a valid email address'
                })
            }else{
                let newObj = omit(errors, "email");
                setErrors(newObj); 
            }
        break;
        case 'password':
            if(
                !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
            ){
                setErrors({
                    ...errors,
                    password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                })
            }else{
                let newObj = omit(errors, "password");
                setErrors(newObj);
                
            }
        break;
        case 'confirmpassword':
            if(value !== password){
                setErrors({
                    ...errors,
                    confirmpassword:'Password does not match'
                })
            }else{
                let newObj = omit(errors, "confirmpassword");
                setErrors(newObj);
            }
            break;
        
        default:
            break;
    }
    
}

const handleChange = (event) => {
  //To stop default events    
  event.persist();

  let name = event.target.name;
  let val = event.target.value;
  if(name === 'password') {
    setPassword(val);
  }
  
  validate(name,val);
}


  const handleSubmit = (event) => {
    event.preventDefault();
    const inputdata = new FormData(event.currentTarget);
    if(Object.keys(errors).length > 0 || inputdata.get('password').length===0) {
       setShowAlert(true);
       return;
    } 

    const data = {  email: inputdata.get('email'),
                    password: inputdata.get('password')
                  };

    axios.post('http://localhost:8080/users/register', data)
      .then(response => {
        history.push("/signin");
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {showAlert && <Alert severity="warning">Provide valid information!</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errors.email  !== undefined  && errors.email.length>0}
                  helperText={errors.email}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password !== undefined  && errors.password.length>0}
                  helperText={errors.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.confirmpassword  !== undefined && errors.confirmpassword.length>0}
                  helperText={errors.confirmpassword}
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}