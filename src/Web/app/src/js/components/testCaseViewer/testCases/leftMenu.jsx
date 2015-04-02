import React from 'react';
import ActionInput from '../../common/actionInput.jsx';
import TestCaseStore from '../../../stores/testCaseStore.js';
import QueryStore from '../../../stores/queryStore.js';
import ViewActionCreators from '../../../actions/viewActionCreators.js';
import perfectScrollbar from 'perfect-scrollbar';

import TestCaseList from './testCaseList.jsx';

class LeftMenu extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            testCaseId: context.router.getCurrentParams().id,
            getTestCasesInProgress: true,
            inProgress: false,
            testCases: []
        }
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.handleStoreChange.bind(this));
        QueryStore.addEventListener(this.handleQueryStoreChange.bind(this));

        this.getTestCaseData();
    }

    componentWillUnmount(){
        TestCaseStore.removeEventListener(this.handleStoreChange.bind(this));
        QueryStore.removeEventListener(this.handleQueryStoreChange.bind(this));
    }

    render(){
        return (
            <div className="left-menu">
                <ActionInput
                    className="left-menu-item"
                    actionName="Go"
                    onActionClick={this.handleGoActionClick.bind(this)}
                    onChange={this.handleInputChange.bind(this)}
                    value={this.state.testCaseId}
                    inProgress={this.state.inProgress}/>

                <TestCaseList
                    testCases={this.state.testCases}
                    inProgress={this.state.getTestCasesInProgress}
                    activeTestCaseId={this.state.testCaseId}
                    onTestCaseClick={this.handleTestCaseClick.bind(this)}/>
            </div>
        );
    }

    getTestCaseData (){
        ViewActionCreators.getTestCases('Development/Shared Queries/Current Sprint/Test Cases');
    }

    handleStoreChange (){
        var data = TestCaseStore.getData();
        this.setState({inProgress: data.inProgress, testCaseId: data.id});
    }

    handleQueryStoreChange (){
        var data = QueryStore.getData();
        this.setState({
            getTestCasesInProgress: data.inProgress,
            testCases: data.testCases
        });
    }

    handleTestCaseClick(id){
        console.log(id);
        // ViewActionCreators.getTestCaseData(id);
        this.context.router.transitionTo('tc', {id: id});
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
