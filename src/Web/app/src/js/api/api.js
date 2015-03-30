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
            console.log('LOGGEDIN AS', data);
            ApiActionCreators.loggedIn(data.userName);
        }).catch((err, e1, e2) => {
            console.log(e1, e2);
            ApiActionCreators.logInFailed(err);
        });
    },

    logOut: () => {

    }
}

export default api;
