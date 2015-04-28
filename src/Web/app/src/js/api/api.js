import xhttp from 'xhttp';
import AjaxError from '../utils/ajaxError.js';
import ApiActionCreators from '../actions/apiActionCreators.js';
import ToastTypes from '../constants/toastTypes.js';
// import {Promise} from 'es6-promise'; //TODO: use some perfet promise library

import objectAssign from 'object-assign';

class Api {
    static get(xhttpParams, customErrors){
        return makeRequest('get', xhttpParams, customErrors);
    }

    static post(xhttpParams, customErrors){
        return makeRequest('post', xhttpParams, customErrors);
    }
}

function makeRequest(method, xhttpParams, customErrors){
    var params;
    if(typeof xhttpParams === 'string'){
        params = {
            method: method,
            url: composeAbsoluteUrl(xhttpParams),
            timeout: 30000
        };
    } else {
        xhttpParams.url = composeAbsoluteUrl(xhttpParams.url);
        params = objectAssign({
            method: method,
            timeout: 30000
        }, xhttpParams);
    }

    return new Promise((resolve, reject) => {
        xhttp(params).then((data) => {
            resolve(data);
        }).catch(({data, xhr}) => {
            var error = new AjaxError(data.message || data.error, xhr);
            reject(error);
            if(!customErrors) ApiActionCreators.addToast("FAIL", error.getMessage(), ToastTypes.ERROR);
        });
    });
}

function composeAbsoluteUrl(url){
    return window.baseUrl + url;
}

export default Api;
