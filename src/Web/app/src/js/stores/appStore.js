import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';

var CHANGE_EVENT = 'change';
class appStore extends EventEmitter{
    constructor(){
        this.state = {name: "Test app"};
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

    handleDo(x){
        this.state.name += x;
    }
}


function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.ADD:
            this.handleDo(action.toAdd);
            this.emitChange();
            break;
    }
}

export default new appStore();
