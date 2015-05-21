import React from 'react';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import UserStore from '../../stores/userStore.js';
import {Router} from 'react-router';
import StatusCodes from '../../constants/statusCodes.js';

import LogInInput from './logInInput.jsx';
import ProgressButton from '../common/progressButton.jsx';
import LoadingPage from '../common/loadingPage.jsx';

class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            identifying: true,
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
            this.context.router.replaceWith('/');
        }else{
            this.setState({
                inProgress: data.inProgress,
                errorMessage: data.error.message,
                errorCode: data.error.statusCode,
                identifying: data.identifying
            });
        }
    }

    handleLogInClick(e){
         e.preventDefault();
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
        var errorMessage = createErrorMessage(this.state.errorCode, this.state.errorMessage);

        if(!this.state.identifying){
            return (
                <form className="login-container" onSubmit={this.handleLogInClick.bind(this)}>
                    <div className="login-header">Please log in</div>

                    {errorMessage?(
                        <div className="login-error">{errorMessage}</div>
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
                            inProgress={this.state.inProgress}
                            className="login-button">
                            Log In
                        </ProgressButton>
                    </div>
                </form>
            );
        }else{
            return <LoadingPage />;
        }
    }
}

LogIn.contextTypes = {
    router: React.PropTypes.func
};

function createErrorMessage(errorCode, orginalErrorMessage){
    var errorMessage = '';
    switch(errorCode){
        case StatusCodes.FORBIDDEN:
            errorMessage = 'Invalid username or password.';
            break;
        default:
            errorMessage = orginalErrorMessage;
            break;
    }

    return errorMessage;
}

export default LogIn;
