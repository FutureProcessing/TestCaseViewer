import React from 'react';
import TestCaseStore from '../../../stores/testCaseStore.js';
import RouterContainer from '../../../routerContainer.js';
import ViewActionCreators from '../../../actions/viewActionCreators.js';
import perfectScrollbar from 'perfect-scrollbar';

import Swirl from '../../common/swirl.jsx';
import StepsTable from './stepsTable.jsx';
import TestCaseInfo from './testCaseInfo.jsx';
import ProgressButton from '../../common/progressButton.jsx';
import ButtonGroup from '../../common/buttonGroup.jsx';


class TestCase extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            id: context.router.getCurrentParams().id,
            steps: [],
            inProgress: false,
            createdBy: '',
            title: ''
        };
        this.storeChangeHandler = this.handleStoreChange.bind(this);
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.storeChangeHandler);

        if(this.state.id) {
            this.getTestCaseData(this.state.id);
        }

        var component = React.findDOMNode(this);
        perfectScrollbar.initialize(component, {
            wheelSpeed: 1,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    }

    componentWillUnmount(){
        TestCaseStore.removeEventListener(this.storeChangeHandler);
    }

    componentWillReceiveProps (){
        var id = this.context.router.getCurrentParams().id;
        if(this.state.id !== id){
            this.getTestCaseData(id);
        }
        this.setState({id});
    }

    getTestCaseData (id){
        ViewActionCreators.getTestCaseData(id);
    }

    render(){
        var content = this.state.inProgress? <Swirl className="test-case-swirl"/>: (
            <div className="test-case">
                <TestCaseInfo
                    title={this.state.title}
                    createdBy={this.state.createdBy}
                    assignedTo={this.state.assignedTo}
                    status={this.state.status}
                    tfsState={this.state.state} />
                <StepsTable
                    steps={this.state.steps} />
                <ButtonGroup>
                    <ProgressButton buttonType="success"
                        inProgress={this.state.acceptInProgress}
                        onClick={this.handleAcceptButtonClick.bind(this)}
                        disabled={!this.state.canAccept}>
                        Accept
                    </ProgressButton>
                    <ProgressButton buttonType="error"
                        inProgress={this.state.rejectInProgress}
                        onClick={this.handleRejectButtonClick.bind(this)}
                        disabled={!this.state.canReject}>
                        Reject
                    </ProgressButton>
                </ButtonGroup>
            </div>
        );

        return (
            <div className="right-content">
                {content}
            </div>
        );
    }

    handleStoreChange(){
        var testCaseData = TestCaseStore.getData();
        this.setState(testCaseData);
    }

    handleAcceptButtonClick(){
        ViewActionCreators.acceptTestCase(this.state.id);
    }

    handleRejectButtonClick(){
        ViewActionCreators.rejectTestCase(this.state.id);
    }
}

TestCase.contextTypes = {
    router: React.PropTypes.func.isRequired
};


export default TestCase;
