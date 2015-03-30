import React from 'react';
import LeftMenu from './leftMenu.jsx';
import TestCase from './testCase.jsx';

class TestCases extends React.Component{
    render(){
        return (
            <div className="content-container">
                <LeftMenu />
                <TestCase />
            </div>
        );
    }
}

export default TestCases;
