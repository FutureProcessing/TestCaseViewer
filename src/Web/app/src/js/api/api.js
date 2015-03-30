import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';

var api = {
    logIn: (user, password) => {
        xhttp({
            url: window.baseUrl + 'auth/login',
            method: 'post',
            type: 'form',
            data: {
                username: user,
                password: password
            }
        }).then(() => {
            return xhttp({ url: window.baseUrl + 'auth/identity'});
        }).then((data) => {
            ApiActionCreators.loggedIn(data.userName);
        }).catch((err) => {
            ApiActionCreators.logInFailed(err.message || err);
        });
    },

    identify: () => {
        return xhttp({ url: window.baseUrl + 'auth/identity'}).then((data) => {
            if(data.isAuthenticated){
                ApiActionCreators.loggedIn(data.userName);
            }
            return data;
        });
    },

    logOut: () => {
        return xhttp({
            url: window.baseUrl + 'auth/logout',
            method: 'post'
        }).then(() => {
            ApiActionCreators.loggedOut();
        }).catch(err => {
            ApiActionCreators.logOutFailed();
        });
    }
}

export default api;
