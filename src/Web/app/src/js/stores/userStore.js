import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';

var CHANGE_EVENT = 'change';
class userStore extends EventEmitter{
    constructor(){
        this.state = {
            username: '',
            isLoggedIn: false
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

    handleLoggedIn(username){
        this.state.username = username;
        this.state.isLoggedIn = true;
    }
}


function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.LOGGED_IN_SUCCESS:
            this.handleLoggedIn(action.username);
            this.emitChange();
            break;
    }
}

export default new userStore();
