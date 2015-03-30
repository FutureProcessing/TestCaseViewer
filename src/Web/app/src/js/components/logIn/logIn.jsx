import React from 'react';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import UserStore from '../../stores/userStore.js';
import {Router} from 'react-router';

import LogInInput from './logInInput.jsx';
import ProgressButton from '../common/progressButton.jsx';

class LogIn extends React.Component{
    constructor(props){
        this.state = {
            user: '',
            password: ''
        };
    }

    static willTransitionTo(transition){
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if(isLoggedIn){
            transition.redirect('/');
        } else{
            ViewActionCreators.logIn();
        }
    }

    componentDidMount(){
        UserStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        UserStore.removeEventListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange(){
        var data = UserStore.getData();
        if(data.isLoggedIn) {
            this.context.router.transitionTo('/');
        }else{
            this.setState({inProgress: data.inProgress, errorMessage: data.errorMessage});
        }
    }

    handleLogInClick(){
        if(this.state.user && this.state.password){
            ViewActionCreators.logIn(this.state.user, this.state.password);
        }
    }

    handleUserChange(e){
        this.setState({user: e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }

    render(){

        return(
            <div className="login-container">
                <div className="login-header">Please log in</div>

                {this.state.errorMessage?(
                    <div className="login-error">{this.state.errorMessage}</div>
                ): null}

                <div className="login-content">

                    <LogInInput
                        onChange={this.handleUserChange.bind(this)}
                        label="user"
                        type="text"/>

                    <LogInInput
                        onChange={this.handlePasswordChange.bind(this)}
                        label="password"
                        type="password"/>

                    <ProgressButton
                        onClick={this.handleLogInClick.bind(this)}
                        inProgress={this.state.inProgress}
                        className="login-button">
                        Log In
                    </ProgressButton>
                </div>


            </div>
        )
    }
}

LogIn.contextTypes = {
    router: React.PropTypes.func
};

export default LogIn
