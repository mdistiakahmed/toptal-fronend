import {useToken} from './useToken'
import jwt_decode from 'jwt-decode';
// token -> get , set
export const useAuth = () =>{

    const {getToken } = useToken()


    const rawToken = getToken(); 
    if(rawToken) {
        const decoded = jwt_decode(rawToken);   
        if(decoded.exp*1000 < new Date().getTime()) {
            return false;
        } else {
            return true;
        }
    
    } else {
        return false;
    }

}