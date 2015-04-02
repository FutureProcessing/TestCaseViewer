import React from 'react';
import Swirl from '../../common/swirl.jsx';

class TestCaseList extends React.Component{
    render(){
        var testCases = this.props.testCases.map((testCase) => {
            return (
                <li onClick={this.props.onTestCaseClick.bind(this, testCase.id)}>
                    {testCase.field_Title}
                </li>
            );
        });

        var content = this.props.inProgress? <Swirl className="test-case-swirl"/> : (
            <ul>
                {testCases}
            </ul>
        );

        return content;
    }
}

TestCaseList.propTypes = {
    testCases: React.PropTypes.array,
    inProgress: React.PropTypes.bool,
    onTestCaseClick: React.PropTypes.func
}

export default TestCaseList;
