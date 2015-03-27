import React from 'react';
import actionCreators from '../../actions/viewActionCreators.js';
import UserStore from '../../stores/userStore.js';
import {Router} from 'react-router';

class LogIn extends React.Component{
    constructor(props){
        this.user = '';
        this.password = '';
    }

    static willTransitionTo(transition){
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if(isLoggedIn){
            transition.redirect('/testCaseViewer');
        }
    }

    componentDidMount(){
        UserStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeEventListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange(){
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if(isLoggedIn) this.context.router.transitionTo('/testCaseViewer');
    }

    handleLogInClick(){
        actionCreators.logIn('a', 'a');
    }

    render(){
        return(
            <div>
                <h1>Please log in</h1>
                <label>user</label>
                <input type="text"></input>

                <label>password</label>
                <input type="text"></input>

                <button onClick={this.handleLogInClick.bind(this)}>Log In</button>
            </div>
        )
    }
}

LogIn.contextTypes = {
  router: React.PropTypes.func
};

export default LogIn
