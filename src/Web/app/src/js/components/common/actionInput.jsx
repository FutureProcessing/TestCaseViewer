import React from 'react';
import Input from './input.jsx';
import ActionInputButton from '../common/actionInputButton.jsx';

class ActionInput extends React.Component{
    render (){
        return (
            <div className="action-input">
                <Input
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.onChange}/>
                <ActionInputButton
                    onClick={this.props.onActionClick}
                    inProgress={this.props.inProgress}
                    className="action-button">
                    {this.props.actionName}
                </ActionInputButton>

            </div>
        );
    }
}

ActionInput.propTypes = {
    type: React.PropTypes.string,
    actionName: React.PropTypes.string,
    onActionClick: React.PropTypes.string,
    value: React.PropTypes.string,
    inProgress: React.PropTypes.boll,
    onChange: React.PropTypes.func
};

export default ActionInput;
