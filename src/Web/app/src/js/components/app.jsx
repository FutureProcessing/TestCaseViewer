import React from 'react';
import {Route, ROUTEHandler, Link} from 'react-router';
import LogIn from './logIn/logIn.jsx';
import TCViewer from './tcViewer/TCViewer.jsx';

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
