import React from 'react';
import {RouteHandler} from 'react-router';
import LeftMenu from './leftMenu.jsx';
import TestCase from './testCase.jsx';

class TestCases extends React.Component{
    render(){
        return (
            <div className="content-container">
                <LeftMenu />
                <RouteHandler />
            </div>
        );
    }
}

export default TestCases;
