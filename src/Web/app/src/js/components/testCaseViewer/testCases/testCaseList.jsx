import React from 'react';
import classNames from 'classnames';
import perfectScrollbar from 'perfect-scrollbar';

import Swirl from '../../common/swirl.jsx';
import StatusIcon from '../../common/statusIcon.jsx';

class TestCaseList extends React.Component{
    componentDidMount(){
        var component = React.findDOMNode(this);
        perfectScrollbar.initialize(component, {
            wheelSpeed: 1,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    };

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
                    
                    <StatusIcon status={testCase.status} />
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
            <div className="test-case-list">
                {content}
            </div>
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
