import React from 'react';
import Toggle from '../../common/toggle.jsx';
import StepsTable from './stepsTable.jsx';
import Input from '../../common/input.jsx';
import SharedStepTable from './sharedStepTable.jsx';

class SharedStepContent extends React.Component{
    render(){
        var header = (
            <div className="step shared-step" >
                <div className="step-action" dangerouslySetInnerHTML={{__html: this.props.step.title}} />
            </div>);

        return(
            <Toggle header={header}>
                <SharedStepTable steps={this.props.step.steps}/>
            </Toggle>
        );
    }
}

SharedStepContent.PropTypes = {
    step: React.PropTypes.object
}

export default SharedStepContent;
