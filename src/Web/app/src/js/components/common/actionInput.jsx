import React from 'react';
import Input from './input.jsx';
import classNames from 'classnames';
import ActionInputButton from '../common/actionInputButton.jsx';

class ActionInput extends React.Component{
    render (){
        var classes = classNames("comm-action-input",this.props.className)
        return (
            <div className={classes}>
                <Input
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.onChange}/>
                <ActionInputButton
                    onClick={this.props.onActionClick}
                    inProgress={this.props.inProgress}
                    className="comm-action-button">
                    {this.props.actionName}
                </ActionInputButton>

            </div>
        );
    }
}

ActionInput.propTypes = {
    type: React.PropTypes.string,
    actionName: React.PropTypes.string,
    onActionClick: React.PropTypes.func,
    value: React.PropTypes.string,
    inProgress: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

export default ActionInput;
