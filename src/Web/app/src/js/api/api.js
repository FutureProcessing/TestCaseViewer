import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';

var api = {
    logIn: (user, password) => {
        xhttp({
            url: window.baseUrl + 'auth/login',
            method: 'post'
        }).then(() => {
            return xhttp({ url: window.baseUrl + 'auth/identity'});
        }).then((data) => {
            console.log('LOGGEDIN AS', data);
            ApiActionCreators.loggedIn(data.userName);
        }).catch(err => {
            console.log('ERROR', err);
        });
    },

    logOut: () => {

    }
}

export default api;
