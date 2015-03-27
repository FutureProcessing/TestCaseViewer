import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

import api from '../api/api.js';

var ApiActionCreators = {
    loggedIn: function(username){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOGGED_IN_SUCCESS,
            username: username
        });
    },

    loggedOut: () => {

    }
};

export default ApiActionCreators;
