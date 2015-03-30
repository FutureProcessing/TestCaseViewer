import React from 'react';
import UserStore from '../../stores/userStore.js';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import {Link} from 'react-router';

class TestCaseViewer extends React.Component {

    static willTransitionTo(transition) {
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if (!isLoggedIn) {
            ViewActionCreators.logIn();
            //transition.redirect('/LogIn', {}, {'nextPath' : transition.path});
        }
    }

    handleLogOffClick(){
        ViewActionCreators.logOut();
    }

    render(){
        return(
            <div>
            <h1>TC Viewer</h1>
            <a onClick={this.handleLogOffClick.bind(this)} > Log off </a>
            </div>
        );
    }
}

TestCaseViewer.contextTypes = {
    router: React.PropTypes.func
};

export default TestCaseViewer;
