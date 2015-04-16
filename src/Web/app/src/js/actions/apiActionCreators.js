import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';

var ApiActionCreators = {
    loggedIn: function(username, displayName){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_IN_SUCCESS,
            username: username,
            displayName: displayName
        });
    },

    logInFailed: function(error){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_IN_FAIL,
            error: error
        });
    },

    identified: function(username, displayName){
        AppDispatcher.handleApiAction({
            type: ActionTypes.IDENTIFY_SUCCESS,
            username: username,
            displayName: displayName
        });
    },

    identifyFailed: function(error){
        AppDispatcher.handleApiAction({
            type: ActionTypes.IDENTIFY_FAIL,
            error: error
        });
    },

    loggedOut: function(){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_OUT_SUCCESS
        });
    },

    logOutFailed: function(error){
        AppDispatcher.handleApiAction({
            type: ActionTypes.LOG_OUT_FAIL,
            error: error
        });
    },

    getTestCaseDataFailed: function(error) {
        AppDispatcher.handleApiAction({
            type: ActionTypes.GET_TC_FAIL,
            error: error
        });
    },

    recievedTestCaseData: function(data){
        AppDispatcher.handleApiAction({
            type: ActionTypes.GET_TC_SUCCESS,
            testCase: data
        });
    },

    acceptedTestCase: function(id){
        AppDispatcher.handleApiAction({
            type: ActionTypes.ACCEPT_TC_SUCCESS,
            id: id
        });
    },

    acceptTestCaseFailed: function(){
        AppDispatcher.handleApiAction({
            type: ActionTypes.ACCEPT_TC_FAIL
        });
    },

    rejectedTestCase: function(id){
        AppDispatcher.handleApiAction({
            type: ActionTypes.REJECT_TC_SUCCESS,
            id: id
        });
    },

    rejectTestCaseFailed: function(){
        AppDispatcher.handleApiAction({
            type: ActionTypes.REJECT_TC_FAIL
        });
    },

    getTestCasesFailed: function(error) {
        AppDispatcher.handleApiAction({
            type: ActionTypes.GET_TEST_CASES_FAIL,
            error: error
        });
    },

    recievedTestCases: function(data, path){
        AppDispatcher.handleApiAction({
            type: ActionTypes.GET_TEST_CASES_SUCCESS,
            testCases: data,
            path: path
        });
    },

    getQueriesFailed: function(error) {
        AppDispatcher.handleApiAction({
            type: ActionTypes.GET_QUERIES_FAIL,
            error: error
        });
    },

    recievedQueries: function(data){
        AppDispatcher.handleApiAction({
            type: ActionTypes.GET_QUERIES_SUCCESS,
            queriesParentNode: data
        });
    },

    addToast: function(title, content, type){
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_TOAST,
            title: title,
            content: content,
            toastType: type
        });
    },

    removeToast: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_TOAST,
            id: id
        });
    },

    removeAllToasts: function(id){
        AppDispatcher.handleViewAction({
            type: ActionTypes.REMOVE_ALL_TOASTS
        });
    }
};

export default ApiActionCreators;
