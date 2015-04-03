import React from 'react';
import UserStore from '../../stores/userStore.js';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import {RouteHandler} from 'react-router';
import TopBar from './topBar.jsx';
import Toaster from '../toaster/toaster.jsx';
import LoadingPage from './loadingPage.jsx';

class TestCaseViewer extends React.Component {
    constructor(){
        this.state = {
            isLoggedIn : UserStore.getData().isLoggedIn
        };

        this.storeChangeHandler = this.handleStoreChange.bind(this);
    }

    componentDidMount(){
        UserStore.addEventListener(this.storeChangeHandler);
        
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if (!isLoggedIn) {
            ViewActionCreators.logIn();
        }
    }

    componentWillUnmount(){
        UserStore.removeEventListener(this.storeChangeHandler);
    }

    handleStoreChange(){
        var isLoggedIn = UserStore.getData().isLoggedIn;
        if(!this.state.isLoggedIn && isLoggedIn)
            this.setState({isLoggedIn});
    }

    handleLogOffClick(){
        ViewActionCreators.logOut();
    }

    render(){
        var loadingPage = !this.state.isLoggedIn? <LoadingPage /> : null;

        return (
            <div className="top-bar-layout-container">
                {loadingPage}
                <TopBar onLogOffClick={this.handleLogOffClick.bind(this)} />
                <Toaster />
                <RouteHandler/>
            </div>
        );
    }
}

TestCaseViewer.contextTypes = {
    router: React.PropTypes.func
};

export default TestCaseViewer;
