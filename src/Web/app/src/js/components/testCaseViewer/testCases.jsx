import React from 'react';
import LeftMenu from './leftMenu.jsx';
import TestCase from './testCase.jsx';

class TestCases extends React.Component{
    render(){
        return (
            <div>
                <LeftMenu />
                <TestCase />
            </div>
        );
    }
}

export default TestCases;
