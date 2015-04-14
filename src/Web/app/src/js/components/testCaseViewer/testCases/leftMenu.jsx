import React from 'react';
import ActionInput from '../../common/actionInput.jsx';
import TestCaseStore from '../../../stores/testCaseStore.js';
import QueryStore from '../../../stores/queryStore.js';
import ViewActionCreators from '../../../actions/viewActionCreators.js';
import perfectScrollbar from 'perfect-scrollbar';

import TestCaseList from './testCaseList.jsx';
import ProgressButton from '../../common/progressButton.jsx';
import LeftMenuExtension from './leftMenuExtenstion.jsx';
import TreeView from '../../common/treeView.jsx';
import QueryButton from './queryButton.jsx';

class LeftMenu extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            testCaseId: context.router.getCurrentParams().id || '',
            getTestCasesInProgress: false,
            inProgress: false,
            isExtensionOpen: false,
            testCases: [],
            queriesParentNode: {},
            selectedQueryName: '',
            selectedQueryPath: ''
        }

        this.queryStoreChangeHandler = this.handleQueryStoreChange.bind(this);
        this.tcStoreChangeHandler = this.handleStoreChange.bind(this);
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.tcStoreChangeHandler);
        QueryStore.addEventListener(this.queryStoreChangeHandler);

        this.initializeQueries();
        this.initializeTestCases();
    }

    componentWillUnmount(){
        TestCaseStore.removeEventListener(this.tcStoreChangeHandler);
        QueryStore.removeEventListener(this.queryStoreChangeHandler);
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

                <QueryButton
                    onClick={this.handleChooseQueryClick.bind(this)}
                    value={this.state.selectedQueryName}
                    isActive={this.state.isExtensionOpen} />

                <TestCaseList
                    testCases={this.state.testCases}
                    inProgress={this.state.getTestCasesInProgress}
                    activeTestCaseId={this.state.testCaseId}
                    onTestCaseClick={this.handleTestCaseClick.bind(this)}/>

                <LeftMenuExtension isOpen={this.state.isExtensionOpen}>
                    <TreeView
                        parentNode={this.state.queriesParentNode}
                        onLeafClick={this.handleQueryClick.bind(this)}
                        selectedNode={this.state.selectedQueryPath}
                        open={true}/>
                </LeftMenuExtension>
            </div>
        );
    }

    initializeTestCases (){
        ViewActionCreators.getTestCases('Development/Shared Queries/Current Sprint/Test Cases', 'Default');
    }

    initializeQueries (){
        ViewActionCreators.getQueries();
    }

    handleStoreChange (){
        var data = TestCaseStore.getData();
        this.setState({inProgress: data.inProgress, testCaseId: data.id});
    }

    handleQueryStoreChange (){
        var data = QueryStore.getData();
        this.setState({
            getTestCasesInProgress: data.inProgress,
            testCases: data.testCases,
            queriesParentNode: data.queriesParentNode,
            selectedQueryName: data.selectedQueryName,
            selectedQueryPath: data.selectedQueryPath
        });
    }

    handleTestCaseClick(id){
        this.context.router.transitionTo('tc', {id: id});
    }

    handleGoActionClick(){
        this.context.router.transitionTo('tc', {id: encodeURIComponent(this.state.testCaseId)});
    }

    handleInputChange(e){
        console.log(Number(e.target.value));
        if(!isNaN(Number(e.target.value))){
            console.log("HMM");
            this.setState({testCaseId: e.target.value});
        }
    }

    handleChooseQueryClick(){
        this.setState({isExtensionOpen: !this.state.isExtensionOpen});
    }

    handleQueryClick(path, name){
        this.setState({isExtensionOpen: false});
        ViewActionCreators.getTestCases(path, name);
    }
}

LeftMenu.contextTypes = {
    router: React.PropTypes.func
};

export default LeftMenu;
