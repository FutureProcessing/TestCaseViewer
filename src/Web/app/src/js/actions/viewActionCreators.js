import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import RouterContainer from '../routerContainer.js';

import api from '../api/api.js';

var ViewActionCreators = {
    logIn: function(user, password){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_IN
        });

        if(user && password){
            api.logIn(user, password);
        }else{
            api.identify().then((data) => {
                if(!data.isAuthenticated){
                    RouterContainer.get().transitionTo('/login');
                }
            });
        }
    },

    logOut: function(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_OFF
        })
        api.logOut().then(() => {
            RouterContainer.get().transitionTo('/login');
        });
    },

    getTestCaseData: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TC
        });

        api.getTestCaseData(id);
    }
};

export default ViewActionCreators;
