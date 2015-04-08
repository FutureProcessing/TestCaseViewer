import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';

var loginApi = {
    authenticate(user, password){
        return this.logIn(user, password).then(() => {
            return xhttp({ url: window.baseUrl + 'auth/identity'});
        }).then((data) => {
            ApiActionCreators.loggedIn(data.userName, data.displayName);
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    },

    logIn(user, password){
        return xhttp({
            url: `${window.baseUrl}auth/login`,
            method: 'post',
            data: {
                username: user,
                password: password
            },
            type: 'form'
        });
    },

    logOut(){
        return xhttp({
            url: window.baseUrl + 'auth/logout',
            method: 'post'
        }).then(() => {
            ApiActionCreators.loggedOut();
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    },

    identify(){
        return xhttp({ url: window.baseUrl + 'auth/identity'}).then((data) => {
            if(data.isAuthenticated){
                ApiActionCreators.loggedIn(data.userName, data.displayName);
            }
            return data;
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    }
}

export default loginApi;
