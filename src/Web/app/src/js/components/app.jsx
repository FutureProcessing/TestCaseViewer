import React from 'react';
import {Route, RouteHandler, Link} from 'react-router';
import LogIn from './logIn/logIn.jsx';
import TestCaseViewer from './testCaseViewer/testCaseViewer.jsx';

import ViewActionCreators from '../actions/viewActionCreators.js';

class App extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = AppStore.getData();
    // }

    // componentDidMount(){
    //     AppStore.addEventListener(this.handleStoreChange.bind(this));
    // }
    //
    // componentWillUnmount() {
    //     AppStore.removeEventListener(this.handleStoreChange.bind(this));
    // }

    // handleStoreChange(){
    //     var data = AppStore.getData();
    //     this.setState({name: data.name});
    // }

    render() {
        return (
            <RouteHandler />
        );
    }
}




export default App;
