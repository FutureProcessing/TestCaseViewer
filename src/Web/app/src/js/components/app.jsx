import React from 'react';
import ViewActionCreators from '../actions/viewActionCreators.js';
import {RouteHandler} from 'react-router';

import Toaster from './toaster/toaster.jsx';

class App extends React.Component{
    render() {
        return (
            <span>
                <RouteHandler/>
                <Toaster />
            </span>

        );
    }
}

export default App;
