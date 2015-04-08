import xhttp from 'xhttp';
import AjaxError from '../utils/ajaxError.js';

import objectAssign from 'object-assign';
class Api {
    static get({url, xhttpParams}){
        var params = objectAssign({
            url: url,
            method: 'get',
        }, xhttpParams);

        return xhttp(params).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    }

    static post({url, data, xhttpParams}){
        var params = objectAssign({
            url: url,
            method: 'post',
            data: data
        }, xhttpParams);

        return xhttp(params).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    }
}

export default Api;
