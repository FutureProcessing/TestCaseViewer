import React from 'react';

class StepContent extends React.Component{
    render(){
        return(
            <div>
                <div className="step-action" dangerouslySetInnerHTML={{__html: this.props.step.action}} />
                <div className="step-result" dangerouslySetInnerHTML={{__html: this.props.step.expectedResult || ''}} />
            </div>
        );
    }
}

StepContent.propTypes = {
    step: React.PropTypes.object
};

export default StepContent;
