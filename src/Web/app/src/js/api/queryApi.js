import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';
import api from './api.js';

var queryApi = {
    getTestCases(path){
        return api.get(`query/list/${encodeURIComponent(path)}`).then((data) => {
            ApiActionCreators.recievedTestCases(mapTestCases(data), path);
        }).catch(error => {
            ApiActionCreators.getTestCasesFailed(error);
        });
    },

    getDefaultTestCases(){
        var path;
        return api.get(`config`).then((data) => {
            path = data.defaultQuery;
            return api.get(`query/list/${encodeURIComponent(path)}`)
        }).then((data) => {
            ApiActionCreators.recievedTestCases(mapTestCases(data), path);
        }).catch(error => {
            ApiActionCreators.getTestCasesFailed(error);
        });
    },

    getQueries(){
        return api.get('queries').then((data) => {
            ApiActionCreators.recievedQueries(mapQueries(data));
        }).catch(error => {
            ApiActionCreators.getQueriesFailed(error);
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
            status: testCase.status,
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
