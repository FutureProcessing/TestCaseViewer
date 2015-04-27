import React from 'react';
import StatusIcon from '../../common/statusIcon.jsx';
import moment from 'moment';

class TestCaseInfo extends React.Component{
    render(){
        return(
            <div>
                <h1>
                    {this.props.title}
                    <StatusIcon className="status-icon" status={this.props.status} enableColors={true} />
                </h1>
                <div className="test-case-props">
                    <div className="created-by-field"> <label>created by:</label> {this.props.createdBy || 'nobody'} </div>
                    <div className="assigned-to-field"> <label>assigned to:</label> {this.props.assignedTo || 'nobody'} </div>
                    <div className="status-field"> <label>status:</label> {this.props.status} </div>
                    <div className="last-changed-field"><label>last changed:</label> <span title={this.props.lastChangedDate.format('LLLL')}>{this.props.lastChangedDate.fromNow()}</span></div>
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
    assignedTo: React.PropTypes.string,
    lastChangedDate: React.PropTypes.object
}

export default TestCaseInfo;
