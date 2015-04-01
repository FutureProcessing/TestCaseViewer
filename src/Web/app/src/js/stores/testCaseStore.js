import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';
import AjaxError from '../utils/ajaxError.js';

var CHANGE_EVENT = 'change';
class TestCaseStore extends EventEmitter{
    constructor(){
        this.state = {
            inProgress: false,
            title: '',
            steps: []
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

    handleRecieveTC(){
        this.state.inProgress = true;
    }

    handleGetTCFail(){
        this.state.inProgress = false;
    }

    handleRecievedTC(testCase){
        this.state.inProgress = false;
        this.state.title = testCase.title;
        this.state.createdBy = testCase.createdBy;
        this.state.state = testCase.state;
        this.state.steps = testCase.steps;
    }
}

function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.GET_TC:
            this.handleRecieveTC();
            this.emitChange();
            break;
        case actionTypes.GET_TC_SUCCESS:
            this.handleRecievedTC(action.testCase);
            this.emitChange();
            break;
        case actionTypes.GET_TC_FAIL:
            this.handleGetTCFail(action.testCase);
            this.emitChange();
            break;
    }
}

export default new TestCaseStore();
