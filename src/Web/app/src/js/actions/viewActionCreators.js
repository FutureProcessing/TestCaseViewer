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
            }).catch(err => {
                RouterContainer.get().transitionTo('/login');
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
            type: ActionTypes.GET_TC,
            id: id
        });

        api.getTestCaseData(id);
    },

    acceptTestCase: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.ACCEPT_TC
        });

        api.acceptTestCase(id).then(() => {
            ViewActionCreators.getTestCaseData(id);
        });
    },

    rejectTestCase: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.REJECT_TC
        });

        api.rejectTestCase(id).then(() => {
            ViewActionCreators.getTestCaseData(id);
        });
    },

    getTestCases: function(query){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TEST_CASES
        });

        api.getTestCases(query);
    }
};

export default ViewActionCreators;
