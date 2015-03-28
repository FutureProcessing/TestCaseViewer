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

    handleLoggedInFail(error){
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
        case actionTypes.LOGGED_IN_SUCCESS:
            this.handleLoggedIn(action.username);
            this.emitChange();
            break;
        case actionTypes.LOGGED_IN_FAIL:
            this.handleLoggedInFail(action.error);
            this.emitChange();
            break;
    }
}

export default new userStore();
