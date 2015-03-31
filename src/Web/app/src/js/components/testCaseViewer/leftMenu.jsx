import React from 'react';
import ActionInput from '../common/actionInput.jsx';

class LeftMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            testCaseId: null
        }
    }

    handleGoActionClick(){
        //console.log('TCID', this.state.testCaseId);
        this.context.router.transitionTo('tc', {id: this.state.testCaseId});
    }

    handleInputChange(e){
        this.setState({testCaseId: e.target.value});
    }

    render(){
        return (
            <div className="left-menu">
                <ActionInput
                    actionName="Go"
                    onActionClick={this.handleGoActionClick.bind(this)}
                    onChange={this.handleInputChange.bind(this)}
                    value={this.state.testCaseId}/>
            </div>
        );
    }
}

LeftMenu.contextTypes = {
    router: React.PropTypes.func
};

export default LeftMenu;
