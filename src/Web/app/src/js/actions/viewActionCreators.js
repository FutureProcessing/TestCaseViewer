import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

var ViewActionCreators = {
    logIn: function(toAdd){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_IN
        });
    }
};

export default ViewActionCreators;
