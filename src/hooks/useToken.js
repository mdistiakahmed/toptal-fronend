export const useToken = ()=> {

    const getToken = () => {
        return localStorage.getItem('AUTH_TOKEN') ?? "";
    }

    const setToken = (tokenToSave) => {
        localStorage.setItem('AUTH_TOKEN' , tokenToSave ?? "abc" )
    }

    const removeToken = () => {
        localStorage.removeItem('AUTH_TOKEN');
    }

    return {getToken , setToken, removeToken}
}