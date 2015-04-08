import React from 'react';
import Toggle from '../../common/toggle.jsx';
import StepsTable from './stepsTable.jsx';
import Input from '../../common/input.jsx';
import SharedStepTable from './sharedStepTable.jsx';
import Icon from '../../common/Icon.jsx';

class SharedStepContent extends React.Component{
    render(){
        var header = (
            <div className="step shared-step" >
                <div className="step-order">{this.props.step.order}</div>
                <Icon icon="arrow-down" className="folder-icon"/>
                <div className="step-action" dangerouslySetInnerHTML={{__html: this.props.step.title}} />
            </div>
        );

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
