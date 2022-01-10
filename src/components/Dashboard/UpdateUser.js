import React , {useContext} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import { UserIdContext } from './Users';
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

const UpdateUser = ({rows,setRows}) => {
    const classes = useStyles();
    const { tokenContext} = useContext(UserContext);
    const { email, setEmail,isAdmin,setIsAdmin, setUpdateMode,oldEmail} = useContext(UserIdContext);
    let currEmail = email;

    const onEmailChange =(e) => {
      e.preventDefault()
      setEmail(e.target.value);
    }


    const submitAndGetAllUser = async()=> {
      let res =  await Service.updateUser(oldEmail,email,isAdmin, tokenContext);
      res =  await Service.getAllUsers(tokenContext);
      setRows(res);
      setUpdateMode(false);

   }


    const handleUpdate = (e) => {
        e.preventDefault();
        if(currEmail.length === 0 ) {
            alert('Email is empty !');
            return ;
        } 
        submitAndGetAllUser();
    };

    return (
        <div className={classes.secondContainer} spacing={2} >
                <TextField
                  value={currEmail}
                  onChange={onEmailChange}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                />
                <FormControlLabel
                    control={<Switch checked={isAdmin} onChange={()=> {
                        setIsAdmin(!isAdmin)}
                     }/>}
                    label="Admin User"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleUpdate}
                    >
                    Update
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => setUpdateMode(false)}
                    >
                    Cancel
                </Button>
        </div>
    )
}


export default UpdateUser
