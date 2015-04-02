import React from 'react';

class TestCaseInfo extends React.Component{
    render(){
        return(
            <div>
                <h1> {this.props.title} </h1>
                <div className="test-case-props">
                    <div className="created-by-field"> <label>created by:</label> {this.props.createdBy} </div>
                    <div className="status-field"> <label>status:</label> {this.props.status} </div>
                    </div>
            </div>
        );
    }
}

TestCaseInfo.propTypes = {
    title: React.PropTypes.string,
    createdBy: React.PropTypes.string,
    status: React.PropTypes.string
}

export default TestCaseInfo;
