import React from 'react';
import TestCaseStore from '../../../stores/testCaseStore.js';
import RouterContainer from '../../../routerContainer.js';
import ViewActionCreators from '../../../actions/viewActionCreators.js';
import perfectScrollbar from 'perfect-scrollbar';

import Swirl from '../../common/swirl.jsx';
import StepsTable from './stepsTable.jsx';

class TestCase extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            id: context.router.getCurrentParams().id,
            steps: [],
            inProgress: false,
            createdBy: '',
            title: ''};

        if(this.state.id) {
            this.state.inProgress = true;
            this.getTestCaseData(this.state.id);
        }
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.handleStoreChange.bind(this));

        var component = React.findDOMNode(this);
        perfectScrollbar.initialize(component, {
            wheelSpeed: 1,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    }

    componentWillUnmount(){
        TestCaseStore.removeEventListener(this.handleStoreChange.bind(this));
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

    handleStoreChange(){
        var testCaseData = TestCaseStore.getData();
        this.setState(testCaseData);
    }

    render(){
        var content = this.state.inProgress?  <Swirl className="test-case-swirl"/>: (
            <div className="test-case">
                <h1>{this.state.title}</h1>

                <StepsTable steps={this.state.steps} />
            </div>
        );

        return (
            <div className="right-content">
                {content}
            </div>
        );
    }
}

TestCase.contextTypes = {
    router: React.PropTypes.func.isRequired
};


export default TestCase;
