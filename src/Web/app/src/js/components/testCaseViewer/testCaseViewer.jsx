import React from 'react';
import UserStore from '../../stores/userStore.js';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import {RouteHandler} from 'react-router';

class TestCaseViewer extends React.Component {

    static willTransitionTo(transition) {
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if (!isLoggedIn) {
            ViewActionCreators.logIn();
        }
    }

    handleLogOffClick(){
        ViewActionCreators.logOut();
    }

    render(){
        return(
            <div>
                
                <div> <a onClick={this.handleLogOffClick.bind(this)} > Log off </a></div>
                <RouteHandler/>
            </div>
        );
    }
}

TestCaseViewer.contextTypes = {
    router: React.PropTypes.func
};

export default TestCaseViewer;
