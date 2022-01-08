import  { useState, useEffect} from 'react';
import AddUser from './AddUser';
import EnhancedTable from './EnhancedTable';
import ResponsiveAppBar from './ResponsiveAppBar';
import { createContext } from 'react';
import UpdateUser from './UpdateUser';

export const UserIdContext = createContext();


const Users = () => {
    const [email , setEmail] = useState('');
    const [oldEmail , setOldEmail] = useState('');
    const [isAdmin , setIsAdmin] = useState(true);
    const [updateMode , setUpdateMode] = useState(true);
    const [rows, setRows] =  useState([]);


    return (
        <UserIdContext.Provider value={{ email, setEmail,oldEmail,setOldEmail,isAdmin,setIsAdmin,updateMode, setUpdateMode}} >
            <div>
                <ResponsiveAppBar />
                {!updateMode && <AddUser rows={rows} setRows={setRows}/>}
                {updateMode && <UpdateUser  rows={rows} setRows={setRows}/> }
                <EnhancedTable rows={rows} setRows={setRows}/>
            </div>
        </UserIdContext.Provider>
    )
}

export default Users
