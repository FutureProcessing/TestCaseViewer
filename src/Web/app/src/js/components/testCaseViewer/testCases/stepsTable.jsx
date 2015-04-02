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

            return <li  key={step.order}> {component} </li>;
        });

        return this.props.steps.length > 0? (
            <ul className="steps-table">
                <li className="header" key="0"> 
                    <div className="step-action" > Action </div>
                    <div className="step-result" > Expected Result</div>
                </li>
                {steps}
            </ul>
        ): null;
    }
}

StepsTable.propTypes = {
    steps: React.PropTypes.array
}

export default StepsTable;
