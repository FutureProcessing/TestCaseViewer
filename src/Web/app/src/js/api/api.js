import xhttp from 'xhttp';
import ApiActionCreators from '../actions/apiActionCreators.js';
import AjaxError from '../utils/ajaxError.js';
import ToastTypes from '../constants/toastTypes.js';

var api = {
    logIn: (user, password) => {
        xhttp({
            url: window.baseUrl + 'auth/login',
            method: 'post',
            type: 'form',
            data: {
                username: user,
                password: password
            }
        }).then(() => {
            return xhttp({ url: window.baseUrl + 'auth/identity'});
        }).then((data) => {
            ApiActionCreators.loggedIn(data.userName, data.displayName);
        }).catch( ({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logInFailed(new AjaxError(message, xhr.status));
        });
    },

    identify: () => {
        return xhttp({ url: window.baseUrl + 'auth/identity'}).then((data) => {
            if(data.isAuthenticated){
                ApiActionCreators.loggedIn(data.userName, data.displayName);
            }
            return data;
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    },

    logOut: () => {
        return xhttp({
            url: window.baseUrl + 'auth/logout',
            method: 'post'
        }).then(() => {
            ApiActionCreators.loggedOut();
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.logOutFailed(new AjaxError(message, xhr.status));
        });
    },

    getTestCaseData: (id) => {
        xhttp({
            url: `${window.baseUrl}testcase/${id}`
        }).then((data) => {
            ApiActionCreators.recievedTestCaseData(mapTestCase(data));
        }).catch(({data, xhr}) => {
            var message = data.message || data.error;
            ApiActionCreators.getTestCaseDataFailed(new AjaxError(message, xhr.status));
            ApiActionCreators.addToast('FAIL', message, ToastTypes.ERROR);
        });
    }
}

xhttp.addErrInterceptor((data, xhr) => {
    return {xhr, data};
});

function mapTestCase(serverData){
    return{
        createdBy: serverData.createdBy,
        title: serverData.title,
        state: serverData.state,
        steps: mapSteps(serverData.steps)
    }
    // return serverData; //TODO: implement
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

export default api;
