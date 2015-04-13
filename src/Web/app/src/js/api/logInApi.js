import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import api from './api.js';

var loginApi = {
    authenticate(user, password){
        return api.post({
            url: `auth/login`,
            data: {
                username: user,
                password: password
            },
            type: 'form'
        }).then(() => {
            return api.get('auth/identity');
        }).then((data) => {
            ApiActionCreators.loggedIn(data.userName, data.displayName);
        }).catch(error => {
            ApiActionCreators.logInFailed(error);
        });
    },

    logOut(){
        return api.post('auth/logout').then(() => {
            ApiActionCreators.loggedOut();
        }).catch(error => {
            ApiActionCreators.logOutFailed(error);
        });
    },

    identify(){
        return api.get('auth/identity').then((data) => {
            setTimeout(() => {
            if(data.isAuthenticated){
                ApiActionCreators.Identified(data.userName, data.displayName);
            } else {
                ApiActionCreators.identifyFailed(new AjaxError());
            }
            return data;
        }, 1000);
        }).catch((error) => {
            setTimeout(() => {
            ApiActionCreators.identifyFailed(error);
        }, 1000);
        });

    }
}

export default loginApi;
