import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';

var CHANGE_EVENT = 'change';
class userStore extends EventEmitter{
    constructor(){
        this.state = {
            username: '',
            isLoggedIn: false,
            inProgress: false,
            errorMessage: ''
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

    handleLogIn(){
        this.state.inProgress = true;
    }

    handleLoggedIn(username){
        this.state.username = username;
        this.state.isLoggedIn = true;
        this.state.inProgress = false;
    }

    handleLogInFail(error){
        this.state.isLoggedIn = false;
        this.state.errorMessage = error;
        this.state.inProgress = false;
    }

    handleLogOut(){
        this.state.inProgress = true;
    }

    handleLoggedOut(){
        this.state.isLoggedIn = false;
        this.state.inProgress = false;
    }

    handleLogOutFail(){
        this.state.errorMessage = error;
        this.state.inProgress = false;
    }
}


function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.LOG_IN:
            this.handleLogIn();
            this.emitChange();
            break;
        case actionTypes.LOG_IN_SUCCESS:
            this.handleLoggedIn(action.username);
            this.emitChange();
            break;
        case actionTypes.LOG_IN_FAIL:
            this.handleLogInFail(action.error);
            this.emitChange();
            break;
        case actionTypes.LOG_OUT:
            this.handleLogOut();
            this.emitChange();
            break;
        case actionTypes.LOG_OUT_SUCCESS:
            this.handleLoggedOut();
            this.emitChange();
            break;
        case actionTypes.LOG_OUT_FAIL:
            this.handleLogOutFail(action.error);
            this.emitChange();
            break;
    }
}

export default new userStore();
