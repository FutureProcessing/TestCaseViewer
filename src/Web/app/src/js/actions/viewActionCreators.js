import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import RouterContainer from '../routerContainer.js';
import QueryTypes from '../constants/queryTypes.js';

import logInApi from '../api/logInApi.js';
import testCaseApi from '../api/testCaseApi.js';
import queryApi from '../api/queryApi.js';

var ViewActionCreators = {
    logIn: function(user, password){
        if(user && password){
            AppDispatcher.handleViewAction({
                type: ActionTypes.LOG_IN
            });

            logInApi.authenticate(user, password);
        }else{
            AppDispatcher.handleViewAction({
                type: ActionTypes.IDENTIFY
            });

            logInApi.identify().then((data) => {
                if(data && !data.isAuthenticated){
                    RouterContainer.get().replaceWith('/login');
                }
            }).catch(err => {
                RouterContainer.get().replaceWith('/login');
            });
        }
    },

    logOut: function(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_OFF
        })
        logInApi.logOut().then(() => {
            RouterContainer.get().replaceWith('/login');
        });
    },

    getTestCaseData: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TC,
            id: id
        });

        testCaseApi.getTestCaseData(id);
    },

    transitionToTestCaseData(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TC,
            id: id
        });

        testCaseApi.getTestCaseData(id).catch(error => {
            RouterContainer.get().goBack();
        });
    },

    acceptTestCase: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.ACCEPT_TC
        });

        testCaseApi.acceptTestCase(id).then(() => {
            ViewActionCreators.getTestCaseData(id);
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

    getTestCases: function(path){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TEST_CASES,
            queryPath: path
        });
        queryApi.getTestCases(path);
    },

    getDefaultTestCases: function(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TEST_CASES
        });
        queryApi.getDefaultTestCases();
    },

    chooseQuery: function(name){
        AppDispatcher.handleViewAction({
            type: ActionTypes.CHOOSE_QUERY,
            queryName: name
        });
    },

    getQueries: function(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_QUERIES
        });

        queryApi.getQueries();
    }
};

export default ViewActionCreators;
