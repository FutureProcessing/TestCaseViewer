import React from 'react';
import StepContent from './stepContent.jsx';
import SharedStepContent from './sharedStepContent.jsx';

class SharedStepTable extends React.Component{
    render(){
        console.log(this.props.steps);
        var steps = this.props.steps.map(step => {
            var component;
            if(step.type === "simple"){
                component = <StepContent step={step}/>;
            } else{
                component = <SharedStepContent step={step}/>;
            }

            //TODO: add key
            return <li > {component} </li>;
        });

        return this.props.steps.length > 0? (
            <ul className="steps-table shared-steps-table">
                {steps}
            </ul>
        ): null;
    }
}

SharedStepTable.propTypes = {
    steps: React.PropTypes.array
}

export default SharedStepTable;
