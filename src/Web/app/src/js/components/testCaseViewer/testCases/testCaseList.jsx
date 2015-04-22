import React from 'react';
import classNames from 'classnames';

import Swirl from '../../common/swirl.jsx';
import StatusIcon from '../../common/statusIcon.jsx';
import ScrollArea from 'react-scrollbar';

var scrollAreaCss = require('style!css!react-scrollbar/dist/css/scrollbar.css');

class TestCaseList extends React.Component{
    render(){
        var activeTestCaseId = this.props.activeTestCaseId;
        var testCases = this.props.testCases.map((testCase) => {
            var classes = classNames('left-menu-item', {
                'active': testCase.id == activeTestCaseId
            });

            return (
                <li key={testCase.id}
                    className={classes}
                    onClick={this.props.onTestCaseClick.bind(this, testCase.id)}>

                    <StatusIcon className="status-icon" status={testCase.status}/>
                    {testCase.title}
                </li>
            );
        });

        var content = this.props.inProgress? <Swirl className="test-case-list-swirl"/> : (
            <ul>
                {testCases}
            </ul>
        );

        return (
            <ScrollArea className="test-case-list" speed={0.5}>
                {content}
            </ScrollArea>
        );
    }
}

TestCaseList.propTypes = {
    testCases: React.PropTypes.array,
    inProgress: React.PropTypes.bool,
    activeTestCaseId: React.PropTypes.string,
    onTestCaseClick: React.PropTypes.func
}

export default TestCaseList;
