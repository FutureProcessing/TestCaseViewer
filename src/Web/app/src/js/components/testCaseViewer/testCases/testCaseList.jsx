import React from 'react';
import classNames from 'classnames';
import Swirl from '../../common/swirl.jsx';

class TestCaseList extends React.Component{
    render(){
        var activeTestCaseId = this.props.activeTestCaseId;
        var testCases = this.props.testCases.map((testCase) => {
            var classes = classNames('left-menu-item', {
                'active': testCase.id == activeTestCaseId
            });
            return (
                <li
                    className={classes}
                    onClick={this.props.onTestCaseClick.bind(this, testCase.id)}>
                    {testCase.field_Title}
                </li>
            );
        });

        var content = this.props.inProgress? <Swirl className="test-case-swirl"/> : (
            <ul className="test-case-list">
                {testCases}
            </ul>
        );

        return content;
    }
}

TestCaseList.propTypes = {
    testCases: React.PropTypes.array,
    inProgress: React.PropTypes.bool,
    activeTestCaseId: React.PropTypes.string,
    onTestCaseClick: React.PropTypes.func
}

export default TestCaseList;
