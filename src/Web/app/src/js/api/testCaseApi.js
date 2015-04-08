import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';

var testCaseApi = {
    getTestCaseData(id){
        return xhttp({
            url: `${window.baseUrl}testcase/${id}`
        }).then((data) => {
            ApiActionCreators.recievedTestCaseData(mapTestCase(data));
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.getTestCaseDataFailed(new AjaxError(message, xhr.status));
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    },

    acceptTestCase(id){
        return xhttp({
            url: `${window.baseUrl}testcase/${id}/accept`,
            method: 'post'
        }).then((data) => {
            ApiActionCreators.acceptedTestCase();
            ApiActionCreators.addToast('ACCEPTED', `Accepted Test Case ${id}`, ToastTypes.SUCCESS);
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.acceptTestCseFailed();
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    },

    rejectTestCase(id){
        return xhttp({
            url: `${window.baseUrl}testcase/${id}/reject`,
            method: 'post'
        }).then((data) => {
            ApiActionCreators.rejectedTestCase();
            ApiActionCreators.addToast('REJECTED', `Rejected Test Case ${id}`, ToastTypes.SUCCESS);
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.rejectTestCseFailed();
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    }
}

function mapTestCase(serverData){
    return{
        createdBy: serverData.createdBy,
        title: serverData.title,
        state: serverData.state,
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
