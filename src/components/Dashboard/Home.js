import  { useState } from 'react';
import { UserContext } from '../Login/context';
import  {useContext } from 'react';
import {useToken} from '../../hooks/useToken';
import ResponsiveAppBar from './ResponsiveAppBar';
import Cards from '../Cards/Cards';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


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
            <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="Name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={3}>
              <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                />
              </Grid>
              <Grid item xs={3}>
              <TextField
                  required
                  fullWidth
                  id="gmtdiff"
                  label="GMT Difference"
                  name="gmtdiff"
                  autoComplete="gmtdiff"
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Add
                </Button>
              </Grid>
            </Grid>
           
            
          </Box>


            <Cards />   
            
        </div>
    )
}

export default Home
