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
            ApiActionCreators.loggedIn(data.userName, data.displayName);
        }).catch( ({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logInFailed(new AjaxError(message, xhr.status));
        });
    },

    identify: () => {
        return xhttp({ url: window.baseUrl + 'auth/identity'}).then((data) => {
            if(data.isAuthenticated){
                ApiActionCreators.loggedIn(data.userName, data.displayName);
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
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    },

    getTestCaseData: (id) => {
        xhttp({
            url: window.baseUrl + 'auth/logout',
            data: {id: id}
        }).then((data) => {
            ApiActionCreators.recievedTestCaseData(data);
        }).catch(({data, xhr}) => {
            ApiActionCreators.getTestCaseDataFailed(new AjaxError(message, xhr.status));
        });
    }
}

xhttp.addErrInterceptor((data, xhr) => {
    return {xhr, data};
});

export default api;
