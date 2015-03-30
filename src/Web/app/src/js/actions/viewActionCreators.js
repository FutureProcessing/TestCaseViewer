import AppDispatcher from '../dispatchers/appDispatcher.js';
import ActionTypes from '../constants/actionTypes.js';
import RouterContainer from '../routerContainer.js';

import api from '../api/api.js';

var ViewActionCreators = {
    logIn: function(user, password){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_IN
        });

        if(user && password){
            api.logIn(user, password);
        }else{
            api.identify().then((data) => {
                if(!data.isAuthenticated){
                    RouterContainer.get().transitionTo('/LogIn');
                    //payload.transition.redirect('/LogIn', {}, {'nextPath' : transition.path});
                }
            });
        }
    },

    logOut: function(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOG_OFF
        })
        api.logOut().then(() => {
            RouterContainer.get().transitionTo('/LogIn');
        });
    }
};

export default ViewActionCreators;
