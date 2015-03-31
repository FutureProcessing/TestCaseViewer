import React from 'react';
import TestCaseStore from '../../stores/testCaseStore.js';
import RouterContainer from '../../routerContainer.js';

class TestCase extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {id: context.router.getCurrentParams().id};
    }

    componentDidMount(){
        TestCaseStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount(){
        TestCaseStore.removeEventListener(this.handleStoreChange.bind(this));
    }

    componentWillReceiveProps (){
        var id = this.context.router.getCurrentParams().id;
        this.setState({id});
    }

    getTestCaseData (id){

    }

    handleStoreChange(){
        var steps = TestCaseStore.getData().steps;
        this.setState({steps});
    }

    render(){
        // var steps = this.state.steps.map(step => {
        //     return <li> {step.Action} </li>;
        // });

        return (
            <div className="right-content">
                TestCase {this.state.id}

                <ul>

                </ul>
            </div>
        );
    }
}

TestCase.contextTypes = {
    router: React.PropTypes.func.isRequired
};


export default TestCase;
