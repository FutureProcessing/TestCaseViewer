import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';

var queryApi = {
    getTestCases(path){
        return xhttp({
            url: `${window.baseUrl}query/list/${encodeURIComponent(path)}`
        }).then((data) => {
            ApiActionCreators.recievedTestCases(mapTestCases(data));
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.getTestCasesFailed(new AjaxError(message, xhr.status));
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    },

    getQueries(){
        return xhttp({
            url: `${window.baseUrl}queries`
        }).then((data) => {
            ApiActionCreators.recievedQueries(mapQueries(data));
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.getQueriesFailed(new AjaxError(message, xhr.status));
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    }
}

function mapTestCases(data){
    return data.map((testCase) => {
        return {
            id: testCase.field_ID,
            type: testCase['field_Work Item Type'],
            title: testCase.field_Title,
            state: testCase.field_State,
            priority: testCase.field_Priority
        };
    });
}

function mapQueries(data){
    var children = [];
    if(data.children){
        children = data.children.map((child, idx) => {
            var mappedChild = mapQueries(child);
            return mappedChild;
        });
    }

    return {
        type: data.type,
        path: data.path,
        name: data.name,
        children: children
    };
}

export default queryApi;
