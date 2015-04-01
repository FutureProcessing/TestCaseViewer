import React from 'react';
import StepContent from './stepContent.jsx';
import SharedStepContent from './sharedStepContent.jsx';

class StepsTable extends React.Component{
    render(){
        var steps = this.props.steps.map(step => {
            var component;
            if(step.type === "simple"){
                component = <StepContent step={step}/>;
            } else{
                component = <SharedStepContent step={step}/>;
            }

            return <li key={performance.now()}> {component} </li>;
        });

        return(
            <ul>
                {steps}
            </ul>
        );
    }
}

StepsTable.propTypes = {
    steps: React.PropTypes.array
}

export default StepsTable;
