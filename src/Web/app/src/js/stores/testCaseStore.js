import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';
import AjaxError from '../utils/ajaxError.js';
import objectAssign from 'object-assign';

var CHANGE_EVENT = 'change';
class TestCaseStore extends EventEmitter{
    constructor(){
        this.state = {
            rejectInProgress: false,
            acceptInProgress: false,
            inProgress: false,
            title: '',
            steps: []
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

    handleRecieveTC(id){
        if(this.state.id !== id){
            this.saveState();
            this.state.id = id;
            this.state.inProgress = true;
        }
    }

    handleGetTCFail(){
        this.restoreState();
        this.state.inProgress = false;
    }

    handleRecievedTC(testCase){
        this.state.inProgress = false;
        this.state.title = testCase.title;
        this.state.createdBy = testCase.createdBy;
        this.state.state = testCase.state;
        this.state.steps = testCase.steps;
    }

    handleAcceptTCStart(){
        this.state.acceptInProgress = true;
    }

    handleAcceptTCFinish(){
        this.state.acceptInProgress = false;
    }

    handleRejectTCStart(){
        this.state.rejectInProgress = true;
    }

    handleRejectTCFinish(){
        this.state.rejectInProgress = false;
    }
}

function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.GET_TC:
            this.handleRecieveTC(action.id);
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

        case actionTypes.ACCEPT_TC:
            this.handleAcceptTCStart();
            this.emitChange();
            break;
        case actionTypes.ACCEPT_TC_SUCCESS:
        case actionTypes.ACCEPT_TC_FAIL:
            this.handleAcceptTCFinish();
            this.emitChange();
            break;

        case actionTypes.REJECT_TC:
            this.handleRejectTCStart();
            this.emitChange();
            break;
        case actionTypes.REJECT_TC_SUCCESS:
        case actionTypes.REJECT_TC_FAIL:
            this.handleRejectTCFinish();
            this.emitChange();
            break;
    }
}

export default new TestCaseStore();
