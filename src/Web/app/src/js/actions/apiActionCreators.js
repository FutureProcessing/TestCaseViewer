import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

import api from '../api/api.js';

var ApiActionCreators = {
    loggedIn: function(username){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOGGED_IN_SUCCESS,
            username: username
        });
    },

    logInFailed: function(error){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOGGED_IN_FAIL,
            error: error
        });
    },

    loggedOut: function(){

    },

    loggedOutFail: function(error){

    }
};

export default ApiActionCreators;
