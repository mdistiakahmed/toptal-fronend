import {useToken} from './useToken'
// token -> get , set
export const useAuth = () =>{

    const {getToken } = useToken()

    const isAuthenticated = getToken() ? true : false;

    return isAuthenticated

}