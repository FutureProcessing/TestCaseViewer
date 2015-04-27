import React from 'react';
import ActionInput from '../../common/actionInput.jsx';
import TestCaseStore from '../../../stores/testCaseStore.js';
import QueryStore from '../../../stores/queryStore.js';
import ViewActionCreators from '../../../actions/viewActionCreators.js';
import QueryTypes from '../../../constants/queryTypes.js';

import TestCaseList from './testCaseList.jsx';
import OneHopTestCaseList from './oneHopTestCaseList.jsx';
import ProgressButton from '../../common/progressButton.jsx';
import LeftMenuExtension from './leftMenuExtenstion.jsx';
import TreeView from '../../common/treeView.jsx';
import QueryButton from './queryButton.jsx';
import ScrollArea from 'react-scrollbar';

var scrollAreaCss = require('style!css!react-scrollbar/dist/css/scrollbar.css');

class LeftMenu extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            testCaseId: context.router.getCurrentParams().id || '',
            getTestCasesInProgress: true,
            getQueriesInProgress: true,
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
        var TestCaseListHandler = this.state.selectedQueryType === QueryTypes.ONE_HOP? OneHopTestCaseList : TestCaseList;
        var emptyTestCaseList = this.state.getTestCasesInProgress || this.state.testCases && this.state.testCases.length > 0 ? null :  <span className="empty-list">Query result contains no test cases</span>;

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
                    isActive={this.state.isExtensionOpen}
                    inProgress={this.state.getTestCasesInProgress}/>

                {emptyTestCaseList}
                <ScrollArea className="test-case-list" speed={0.5}>
                    <TestCaseListHandler
                        testCases={this.state.testCases}
                        inProgress={this.state.getTestCasesInProgress}
                        activeTestCaseId={this.state.testCaseId}
                        onTestCaseClick={this.handleTestCaseClick.bind(this)}/>
                </ScrollArea>

                <LeftMenuExtension isOpen={this.state.isExtensionOpen}>
                    <TreeView
                        parentNode={this.state.queriesParentNode}
                        onLeafClick={this.handleQueryClick.bind(this)}
                        selectedNode={this.state.selectedQueryPath}
                        open={true}
                        value={x => {
                            return {path : x.path, type : x.queryType};
                            }}
                        text={x => x.name}
                        children={x => x.children}
                        isNode={x => x.type === 'folder'}
                        isLeafDisabled={ x => x.queryType !== QueryTypes.LIST && x.queryType !== QueryTypes.ONE_HOP}
                        />
                </LeftMenuExtension>
            </div>
        );
    }

    initializeTestCases (){
        setTimeout(() => {
            ViewActionCreators.getDefaultTestCases();
        },1); //FIXME: it is just wrong
    }

    initializeQueries (){
        setTimeout(() => {
            ViewActionCreators.getQueries();
        },1); //FIXME: it is just wrong
    }

    handleStoreChange (){
        var data = TestCaseStore.getData();
        this.setState({inProgress: data.inProgress, testCaseId: data.id});
    }

    handleQueryStoreChange (){
        var data = QueryStore.getData();
        this.setState({
            getTestCasesInProgress: data.getTestCasesInProgress,
            getQueriesInProgress: data.getQueriesInProgress,
            testCases: data.testCases,
            queriesParentNode: data.queriesParentNode,
            selectedQueryName: data.selectedQueryName,
            selectedQueryPath: data.selectedQueryPath,
            selectedQueryType: data.selectedQueryType
        });
    }

    handleTestCaseClick(id){
        this.context.router.transitionTo('tc', {id: id});
    }

    handleGoActionClick(){
        this.context.router.transitionTo('tc', {id: encodeURIComponent(this.state.testCaseId)});
    }

    handleInputChange(e){
        if(!isNaN(Number(e.target.value))){
            this.setState({testCaseId: e.target.value});
        }
    }

    handleChooseQueryClick(){
        this.setState({isExtensionOpen: !this.state.isExtensionOpen});
    }

    handleQueryClick(value, name){
        this.setState({isExtensionOpen: false});
        ViewActionCreators.getTestCases(value.path, name, value.type);
    }
}

LeftMenu.contextTypes = {
    router: React.PropTypes.func
};

export default LeftMenu;
