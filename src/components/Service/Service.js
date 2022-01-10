import axios from 'axios'
import jwt_decode from 'jwt-decode';

export class Service {
    static getAllUsers(token) {
        return new Promise(resolve => {
            axios.get('http://localhost:8080/users/getAllUser', {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => {
                    let result = res.data.map((item) => {
                        if (item.hasAdminRole) {
                            item.role = 'Admin'
                        } else {
                            item.role = 'User'
                        }
                        item.password = '*******'
                        return item;
                    })
                    resolve(result)
                })
        });
    }

    static addNewUser(email, password, isAdmin, token) {
        const data = {  
            email: email,
            password: password,
            hasAdminRole: isAdmin
        };

        return new Promise(resolve => {
            axios.post('http://localhost:8080/users/addUser', data,{
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => {
                let result = res.data;
                resolve(result)
            }).catch(error => {

            });
        });
    }


    static deleteBulkUser(emailIds, token) {
        const data = {  
            emailIds: emailIds
        };

        return new Promise(resolve => {
            axios.delete('http://localhost:8080/users/deleteUsers',
             {  data , headers: { "Authorization": `Bearer ${token}` } })
             .then(res => {
                let result = res.data;
                resolve(result)
            })

        });
    }

    static updateUser(oldEmail, newEmail, newRole, token) {
        const data = {  
            oldEmail: oldEmail,
            newEmail: newEmail,
            newRole: newRole
        };

        return new Promise(resolve => {
            axios.post('http://localhost:8080/users/updateUser',
              data ,{ headers: { "Authorization": `Bearer ${token}` } })
             .then(res => {
                let result = res.data;
                resolve(result)
            })

        });
    }

    static addNewTimeZone(name, city, hourDiff,minDiff, token) {
        const rowToken = localStorage.getItem('AUTH_TOKEN')??"";
        const decoded = jwt_decode(rowToken); 

        const data = {  
            email: decoded.sub,
            name: name,
            city: city,
            hourDiff: hourDiff,
            minDiff: minDiff,
        };

        return new Promise(resolve => {
            axios.post('http://localhost:8080/timezones/addTimeZone',
              data ,{ headers: { "Authorization": `Bearer ${token}` } })
             .then(res => {
                let result = res.data;
                resolve(result)
            }).catch(error => {
                alert(error);
            });

        });
    
    }


    static getUsersTimeZone(token) {
        const rowToken = localStorage.getItem('AUTH_TOKEN')??"";
        const decoded = jwt_decode(rowToken); 

        const data = {  
            email: decoded.sub
        };

        return new Promise(resolve => {
            axios.post('http://localhost:8080/timezones/getUserTimeZone',data, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => {
                    
                    let result = res.data;
                    resolve(result)
                })
        });
    }


    static deleteTimeZone(id, token) {
        const url = 'http://localhost:8080/timezones/deleteTimeZone/' + id;
        return new Promise(resolve => {
            axios.delete(url,
             { headers: { "Authorization": `Bearer ${token}` } })
             .then(res => {
                let result = res.data;
                resolve(result)
            })

        });
    }

    static updateTimeZone(id, name, city, hourDiff,minDiff, token) {
        const data = {  
            id: id,
            name: name,
            city: city,
            hourDiff: hourDiff,
            minDiff: minDiff
        };

        return new Promise(resolve => {
            axios.post('http://localhost:8080/timezones/updateTimeZone',
              data ,{ headers: { "Authorization": `Bearer ${token}` } })
             .then(res => {
                let result = res.data;
                resolve(result)
            })

        });
    }


    static getAllTimeZone(token) {

        return new Promise(resolve => {
            axios.get('http://localhost:8080/timezones/getAllTimeZone', {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => {                   
                    let result = res.data;
                    resolve(result)
                })
        });
    }

}