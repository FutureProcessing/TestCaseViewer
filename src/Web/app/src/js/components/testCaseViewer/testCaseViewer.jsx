import React from 'react';
import UserStore from '../../stores/userStore.js';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import {RouteHandler} from 'react-router';
import TopBar from './topBar.jsx';

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
            <div className="top-bar-layout-container">
                <TopBar onLogOffClick={this.handleLogOffClick.bind(this)} />
                <RouteHandler/>
            </div>
        );
    }
}

TestCaseViewer.contextTypes = {
    router: React.PropTypes.func
};

export default TestCaseViewer;
