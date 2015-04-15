import React from 'react';
import StatusIcon from '../../common/statusIcon.jsx';

class TestCaseInfo extends React.Component{
    render(){
        return(
            <div>
                <h1>
                    {this.props.title}
                    <StatusIcon className="status-icon" status={this.props.status} enableColors={true} />
                </h1>
                <div className="test-case-props">
                    <div className="created-by-field"> <label>created by:</label> {this.props.createdBy} </div>
                    <div className="assigned-to-field"> <label>assigned to:</label> {this.props.assignedTo} </div>
                    <div className="status-field"> <label>status:</label> {this.props.status} </div>
                    </div>
            </div>
        );
    }
}

TestCaseInfo.propTypes = {
    title: React.PropTypes.string,
    createdBy: React.PropTypes.string,
    status: React.PropTypes.string,
    tfsState: React.PropTypes.string,
    assignedTo: React.PropTypes.string
}

export default TestCaseInfo;
