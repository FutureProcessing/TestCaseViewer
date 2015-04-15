import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';
import api from './api.js';

var testCaseApi = {
    getTestCaseData(id){
        return api.get(`testcase/${id}`).then((data) => {
            ApiActionCreators.recievedTestCaseData(mapTestCase(data));
        }).catch(error => {
            ApiActionCreators.getTestCaseDataFailed(error);
        });
    },

    acceptTestCase(id){
        return api.post(`testcase/${id}/accept`).then((data) => {
            ApiActionCreators.acceptedTestCase();
            ApiActionCreators.addToast('ACCEPTED', `Accepted Test Case ${id}`, ToastTypes.SUCCESS);
        }).catch(error => {
            ApiActionCreators.acceptTestCaseFailed(error);
        });
    },

    rejectTestCase(id){
        return api.post(`testcase/${id}/reject`).then((data) => {
            ApiActionCreators.rejectedTestCase();
            ApiActionCreators.addToast('REJECTED', `Rejected Test Case ${id}`, ToastTypes.SUCCESS);
        }).catch(error => {
            ApiActionCreators.rejectTestCaseFailed(error);
        });
    }
}

function mapTestCase(serverData){
    return{
        createdBy: serverData.createdBy,
        assignedTo: serverData.assignedTo,
        title: serverData.title,
        state: serverData.state,
        status: serverData.status,
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
