import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';
import api from './api.js';
import moment from 'moment';

var testCaseApi = {
    getTestCaseData(id){
        return new Promise((resolve, reject) => {
            api.get(`testcase/${id}`).then((data) => {
                ApiActionCreators.recievedTestCaseData(mapTestCase(data));
                resolve(data);
            }).catch(error => {
                ApiActionCreators.getTestCaseDataFailed(error);
                reject(error);
            });
        });
    },

    acceptTestCase(id){
        return api.post(`testcase/${id}/accept`).then((data) => {
            ApiActionCreators.acceptedTestCase(id);
            ApiActionCreators.addToast('ACCEPTED', `Accepted Test Case ${id}`, ToastTypes.SUCCESS);
        }).catch(error => {
            ApiActionCreators.acceptTestCaseFailed(error);
        });
    },

    rejectTestCase(id){
        return api.post(`testcase/${id}/reject`).then((data) => {
            ApiActionCreators.rejectedTestCase(id);
            ApiActionCreators.addToast('REJECTED', `Rejected Test Case ${id}`, ToastTypes.SUCCESS);
        }).catch(error => {
            ApiActionCreators.rejectTestCaseFailed(error);
        });
    }
}

function mapTestCase(serverData){
    return{
        id: serverData.id,
        createdBy: serverData.createdBy,
        assignedTo: serverData.assignedTo,
        title: serverData.title,
        state: serverData.state,
        status: serverData.status,
        lastChangedDate: moment(serverData.lastChangedDate),
        steps: mapSteps(serverData.steps)
    }
}

function mapSteps(steps){
    return steps.map((step, idx) => {
        var order = idx + 1;
        if(step.type === 'simple'){
            return {
                action: step.action,
                expectedResult: step.expectedResult,
                type: step.type,
                order: order
            };
        }else{
            return{
                title: step.title,
                sharedStepId: step.sharedStepId,
                steps: mapSteps(step.steps),
                order: order
            }
        }
    })
}

export default testCaseApi;
