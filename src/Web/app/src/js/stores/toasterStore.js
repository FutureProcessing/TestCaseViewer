import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/appDispatcher.js';
import actionTypes from '../constants/actionTypes.js';
import ToastTypes from '../constants/toastTypes.js';
import AjaxError from '../utils/ajaxError.js';

var CHANGE_EVENT = 'changeToaster';
class Toast{
    constructor(title, content, type){
        this.type = type;
        this.title = title;
        this.content = content;
        this.timestamp = performance.now();
        this.autoRemove = (type === ToastTypes.SUCCESS) || (type === ToastTypes.INFO);
    }
}

class ToasterStore extends EventEmitter{
    constructor(){
        super();
        this.state = {
            toasts: []
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

    getToasts(){
        return this.state.toasts;
    }

    handleAddToast(title, content, type){
        this.state.toasts.push(new Toast(title, content, type));
    }

    handleRemoveToast(id){
        var toastToRemove =  this.state.toasts.filter(x => x.timestamp === id)[0];
        var idx = this.state.toasts.indexOf(toastToRemove);

        this.state.toasts.splice(idx, 1);
    }

    handleRemoveAllToasts(){
        this.state.toasts = [];
    }
}

function register(payload){
    var action = payload.action;

    switch(action.type){
        case actionTypes.ADD_TOAST:
            this.handleAddToast(action.title, action.content, action.toastType);
            this.emitChange();
            break;
        case actionTypes.REMOVE_TOAST:
            this.handleRemoveToast(action.id);
            this.emitChange();
            break;
        case actionTypes.REMOVE_ALL_TOASTS:
            this.handleRemoveAllToasts();
            this.emitChange();
            break;
    }
}

export default new ToasterStore();
