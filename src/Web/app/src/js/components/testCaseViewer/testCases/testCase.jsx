import React from 'react';
import TestCaseStore from '../../../stores/testCaseStore.js';
import RouterContainer from '../../../routerContainer.js';
import ViewActionCreators from '../../../actions/viewActionCreators.js';

class TestCase extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            id: context.router.getCurrentParams().id,
            steps: [],
            inProgress: false,
            createdBy: '',
            title: ''};

        if(this.state.id) this.getTestCaseData(this.state.id);
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.handleStoreChange.bind(this));
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
        var steps = this.state.steps.map(step => {
            return <li ><span dangerouslySetInnerHTML={{__html: step.action}} /> </li>;
        });

        var content = this.state.inProgress? '...': (
            <div>
                <h1>{this.state.title}</h1>
                <ul>
                    {steps}
                </ul>
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
