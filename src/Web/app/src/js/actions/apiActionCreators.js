import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

import api from '../api/api.js';

var ApiActionCreators = {
    loggedIn: function(username){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_IN_SUCCESS,
            username: username
        });
    },

    logInFailed: function(error){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_IN_FAIL,
            error: error
        });
    },

    loggedOut: function(){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_OUT_SUCCESS
        });
    },

    logOutFail: function(error){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_OUT_FAIL,
            error: error
        });
    }
};

export default ApiActionCreators;
