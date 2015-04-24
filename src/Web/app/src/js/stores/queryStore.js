import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';
import AjaxError from '../utils/ajaxError.js';
import objectAssign from 'object-assign';
import tcStatuses from '../constants/tcStatuses.js';

var CHANGE_EVENT = 'changeQueryStore';
class QueryStore extends EventEmitter{
    constructor(){
        this.state = {
            inProgress: false,
            testCases: [],
            queriesParentNode: {},
            selectedQueryName: '',
            selectedQueryPath: ''
        };

        this.lastProperState = {};

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

    saveState(){
        objectAssign(this.lastProperState, this.state);
    }

    restoreState(){
        objectAssign(this.state, this.lastProperState);
    }

    getData(){
        return this.state;
    }

    handleGetTestCases(queryName, queryPath){
        this.saveState();
        this.state.inProgress = true;
        this.state.selectedQueryName = queryName;
        this.state.selectedQueryPath = queryPath;
    }

    handleGetTestCasesFail(){
        this.restoreState();
        this.state.inProgress = false;
    }

    handleRecievedTestCases(testCases, path, queryType){
        this.state.inProgress = false;
        this.state.testCases = testCases;

        var splittedPath = path.split('/');
        this.state.selectedQueryName  = this.state.selectedQueryName || splittedPath[splittedPath.length -1];
        this.state.selectedQueryPath  = this.state.selectedQueryName || path;
        this.state.selectedQueryType = queryType;
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

    handleAcceptedTc(id){
        var tc = this.state.testCases.filter(x => x.id == id)[0];
        tc.status = tcStatuses.ready;
    }

    handleRejectedTc(id){
        var tc = this.state.testCases.filter(x => x.id == id)[0];
        tc.status = tcStatuses.design;
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
            this.handleRecievedTestCases(action.testCases, action.path, action.queryType);
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

        case actionTypes.ACCEPT_TC_SUCCESS:
            this.handleAcceptedTc(action.id);
            this.emitChange();
            break;
        case actionTypes.REJECT_TC_SUCCESS:
            this.handleRejectedTc(action.id);
            this.emitChange();
            break;
    }
}

export default new QueryStore();
