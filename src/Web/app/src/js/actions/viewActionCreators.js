import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

var ViewActionCreators = {
    add: function(toAdd){
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD,
            toAdd: toAdd
        });
    }
};

export default ViewActionCreators;
