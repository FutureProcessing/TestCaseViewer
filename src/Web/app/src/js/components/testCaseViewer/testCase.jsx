import React from 'react';
import TestCaseStore from '../../stores/testCaseStore.js';
import RouterContainer from '../../routerContainer.js';
import ViewActionCreators from '../../actions/viewActionCreators.js';

class TestCase extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {
            id: context.router.getCurrentParams().id,
            steps: [],
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

        return (
            <div className="right-content">
                <h1>{this.state.title}</h1>

                <ul>
                    {steps}
                </ul>
                <button onClick={() => {ViewActionCreators.addToast('SUCCESS', 'SUCCESS')}}> Add toast 1 </button>
                    <button onClick={() => {ViewActionCreators.addToast('INFO', 'INFO')}}> Add toast 2 </button>
                        <button onClick={() => {ViewActionCreators.addToast('WARNING', 'WARNING')}}> Add toast 3 </button>
                            <button onClick={() => {ViewActionCreators.addToast('ERROR', 'ERROR')}}> Add toast 4 </button>
            </div>
        );
    }
}

TestCase.contextTypes = {
    router: React.PropTypes.func.isRequired
};


export default TestCase;
