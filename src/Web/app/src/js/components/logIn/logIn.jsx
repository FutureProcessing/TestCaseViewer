import React from 'react';
import actionCreators from '../../actions/viewActionCreators.js';
import UserStore from '../../stores/userStore.js';
import {Router} from 'react-router';
import LogInInput from './logInInput.jsx';

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
        var data = UserStore.getData();
        if(data.isLoggedIn) {
            this.context.router.transitionTo('/testCaseViewer');
        }else{
            this.setState({inProgress: data.inProgress, errorMessage: data.errorMessage});
        }
    }

    handleLogInClick(){
        actionCreators.logIn(this.state.user, this.state.password);
    }

    handleUserChange(e){
        this.setState({user: e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }

    render(){

        return(
            <div>
                <h1>Please log in</h1>

                <LogInInput onChange={this.handleUserChange.bind(this)}
                    label="user"
                    >
                </LogInInput>


                <label>password</label>
                <input type="password" onChange={this.handlePasswordChange.bind(this)}></input>

                <button onClick={this.handleLogInClick.bind(this)}>Log In</button>
                {this.state.inProgress? '...': null}
                {this.state.errorMessage || null}
            </div>
        )
    }
}

LogIn.contextTypes = {
    router: React.PropTypes.func
};

export default LogIn
