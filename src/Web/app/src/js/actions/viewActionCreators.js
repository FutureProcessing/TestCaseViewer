import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import RouterContainer from '../routerContainer.js';

import logInApi from '../api/logInApi.js';
import testCaseApi from '../api/testCaseApi.js';
import queryApi from '../api/queryApi.js';

var ViewActionCreators = {
    logIn: function(user, password){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_IN
        });

        if(user && password){
            logInApi.authenticate(user, password);
        }else{
            logInApi.identify().then((data) => {
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
        logInApi.logOut().then(() => {
            RouterContainer.get().transitionTo('/login');
        });
    },

    getTestCaseData: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TC,
            id: id
        });

        testCaseApi.getTestCaseData(id);
    },

    acceptTestCase: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.ACCEPT_TC
        });

        testCaseApi.acceptTestCase(id).then(() => {
            ViewActionCreators.getTestCaseData(id);
            //TODO: Refresh testcase list
        });
    },

    rejectTestCase: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.REJECT_TC
        });

        testCaseApi.rejectTestCase(id).then(() => {
            ViewActionCreators.getTestCaseData(id);
        });
    },

    getTestCases: function(path, name){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TEST_CASES,
            queryPath: path,
            queryName: name
        });

        queryApi.getTestCases(path);
    },

    getQueries: function(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_QUERIES
        });

        queryApi.getQueries();
    }
};

export default ViewActionCreators;
