import xhttp from 'xhttp';
import AjaxError from '../utils/ajaxError.js';
import ApiActionCreators from '../actions/apiActionCreators.js';
import ToastTypes from '../constants/toastTypes.js';

import objectAssign from 'object-assign';
class Api {
    static get(xhttpParams){
        var params;
        if(typeof xhttpParams === 'string'){
            params = {
                method: 'get',
                url: composeAbsoluteUrl(xhttpParams)
            };
        }else{
            xhttpParams.url = composeAbsoluteUrl(xhttpParams.url);
            params = objectAssign({
                method: 'get',
            }, xhttpParams);
        }

        return new Promise((resolve, reject) => {
            xhttp(params).then((data) => {
                resolve(data);
            }).catch(({data, xhr}) => {
                var error = new AjaxError(data.message || data.error, xhr);

                reject(error);
                ApiActionCreators.addToast("FAIL", error.getMessage(), ToastTypes.ERROR);
            });
        });
    }

    static post(xhttpParams){
        var params;
        if(typeof xhttpParams === 'string'){
            params = {
                method: 'post',
                url: composeAbsoluteUrl(xhttpParams)
            };
        }else{
            xhttpParams.url = composeAbsoluteUrl(xhttpParams.url);
            params = objectAssign({
                method: 'post',
            }, xhttpParams);
        }

        return new Promise((resolve, reject) => {
            xhttp(params).then((data) => {
                resolve(data);
            }).catch(({data, xhr}) => {
                var error = new AjaxError(data.message || data.error, xhr);

                reject(error);
                ApiActionCreators.addToast("FAIL", error.getMessage(), ToastTypes.ERROR);
            });
        });
    }
}

function handleError({data, xhr}){
    var error = new AjaxError(data.message || data.error, xhr);

    reject(error);
    ApiActionCreators.addToast("FAIL", error.mgetMessage(), ToastTypes.ERROR);
}

function composeAbsoluteUrl(url){
    return window.baseUrl + url;
}

export default Api;
