import React from 'react';
import TestCaseList from './testCaseList.jsx';
import Icon from '../../common/Icon.jsx';
import Toggle from '../../common/toggle.jsx';

class OneHopTestCaseList extends React.Component{
    render (){
        var props = this.props;
        var nodes = this.props.testCases.map(x => {
            return (
                <Toggle
                    open = {true}
                    header={(
                        <span className="toggle-header">
                            <Icon icon="arrow-down" className="folder-icon"/>
                            {x.name}
                        </span>
                    )}>
                    <TestCaseList
                        testCases={x.workItems}
                        inProgress={false}
                        activeTestCaseId={props.activeTestCaseId}
                        onTestCaseClick={props.onTestCaseClick} />
                </Toggle>
            );
        });

        return (
            <ul className="one-hop-list">
                {nodes}
            </ul>
        );
    }
}

OneHopTestCaseList.propTypes = {
    testCases: React.PropTypes.array,
    inProgress: React.PropTypes.bool,
    activeTestCaseId: React.PropTypes.string,
    onTestCaseClick: React.PropTypes.func
}

export default OneHopTestCaseList;
