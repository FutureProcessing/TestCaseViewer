import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

import api from '../api/api.js';

var ViewActionCreators = {
    logIn: function(user, password){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_IN
        });
        api.logIn(user, password);
    }
};

export default ViewActionCreators;
