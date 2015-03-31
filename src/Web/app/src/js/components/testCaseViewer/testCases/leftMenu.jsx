import React from 'react';
import ActionInput from '../../common/actionInput.jsx';
import TestCaseStore from '../../../stores/testCaseStore.js';

class LeftMenu extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            testCaseId: context.router.getCurrentParams().id,
            inProgress: false
        }
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount(){
        TestCaseStore.removeEventListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange (){
        var inProgress = TestCaseStore.getData().inProgress;
        this.setState({inProgress});
    }

    render(){
        return (
            <div className="left-menu">
                <ActionInput
                    actionName="Go"
                    onActionClick={this.handleGoActionClick.bind(this)}
                    onChange={this.handleInputChange.bind(this)}
                    value={this.state.testCaseId}
                    inProgress={this.state.inProgress}/>
            </div>
        );
    }

    handleGoActionClick(){
        this.context.router.transitionTo('tc', {id: this.state.testCaseId});
    }

    handleInputChange(e){
        this.setState({testCaseId: e.target.value});
    }
}

LeftMenu.contextTypes = {
    router: React.PropTypes.func
};

export default LeftMenu;
