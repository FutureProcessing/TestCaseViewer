import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';

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
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
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
            url: `${window.baseUrl}testcase/${id}`
        }).then((data) => {
            ApiActionCreators.recievedTestCaseData(createTestCaseModel(data));
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.getTestCaseDataFailed(new AjaxError(message, xhr.status));
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    }
}

xhttp.addErrInterceptor((data, xhr) => {
    return {xhr, data};
});

function createTestCaseModel(serverData){
    return serverData; //TODO: implement
}

export default api;
