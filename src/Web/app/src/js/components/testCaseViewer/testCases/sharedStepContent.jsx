import React from 'react';

class SharedStepContent extends React.Component{
    render(){
        return(
            <div>
                SHARED STEP - DUPA
                <div className="step-action" dangerouslySetInnerHTML={{__html: this.props.step.title}} />

                {/*<StepstTable steps={step.steps}/>*/}
            </div>

        );
    }
}

SharedStepContent.PropTypes = {
    step: React.PropTypes.object
}

export default SharedStepContent;
