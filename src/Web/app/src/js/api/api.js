import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';

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
        }).catch( ({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logInFailed(new AjaxError(message, xhr.status));
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

xhttp.addErrInterceptor((data, xhr) => {
    return {xhr, data};
});

export default api;
