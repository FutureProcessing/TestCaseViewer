import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher{
    handleViewAction(action){
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
        this.dispatch(payload);
    }

    handleApiAction(action) {
        var payload = {
            source: 'API_ACTION',
            action: action
        };
        this.dispatch(payload);
    }
}

var appDispatcherInstance = new AppDispatcher();

export default appDispatcherInstance;
