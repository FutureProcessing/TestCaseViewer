import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';
import AjaxError from '../utils/ajaxError.js';

var CHANGE_EVENT = 'changeQueryStore';
class QueryStore extends EventEmitter{
    constructor(){
        this.state = {
            inProgress: false,
            testCases: [],
            queriesParentNode: [],
            selectedQueryName: '',
            selectedQueryPath: ''
        };

        this.dispatchToken = AppDispatcher.register(register.bind(this));
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    addEventListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeEventListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    getData(){
        return this.state;
    }

    handleGetTestCases(queryName, queryPath){
        this.state.inProgress = true;
        this.state.selectedQueryName = queryName;
        this.state.selectedQueryPath = queryPath;
    }

    handleGetTestCasesFail(){
        this.state.inProgress = false;
    }

    handleRecievedTestCases(testCases){
        this.state.inProgress = false;
        this.state.testCases = testCases;
    }

    handleGetQueries(){
        this.state.inProgress = true;
    }

    handleGetQueriesFail(){
        this.state.inProgress = false;
    }

    handleRecievedQueries(queriesParentNode){
        this.state.inProgress = false;
        this.state.queriesParentNode = queriesParentNode;
    }
}

function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.GET_TEST_CASES:
            this.handleGetTestCases(action.queryName, action.queryPath);
            this.emitChange();
            break;
        case actionTypes.GET_TEST_CASES_SUCCESS:
            this.handleRecievedTestCases(action.testCases);
            this.emitChange();
            break;
        case actionTypes.GET_TEST_CASES_FAIL:
            this.handleGetTestCasesFail();
            this.emitChange();
            break;

        case actionTypes.GET_QUERIES:
            this.handleGetQueries();
            this.emitChange();
            break;
        case actionTypes.GET_QUERIES_SUCCESS:
            this.handleRecievedQueries(action.queriesParentNode);
            this.emitChange();
            break;
        case actionTypes.GET_QUERIES_FAIL:
            this.handleGetQueriesFail();
            this.emitChange();
            break;
    }
}

export default new QueryStore();
