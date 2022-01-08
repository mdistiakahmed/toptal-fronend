import jwt_decode from 'jwt-decode';
import {useToken} from './useToken'

export class Roles {
    static ROLE_ADMIN ='ADMIN';
    static ROLE_USER = 'USER'
}

export const useRole = () => {
    const { getToken } = useToken()

    let userRole = Roles.ROLE_USER;

    const rawToken = getToken(); 
    if(rawToken) {
        const decoded = jwt_decode(rawToken);   
        if(decoded.roles === 'ROLE_ADMIN'){
            userRole = Roles.ROLE_ADMIN
        }else{
            userRole = Roles.ROLE_USER
        }
        localStorage.setItem('EMAIL' , decoded.sub);
    }

    return userRole;
}