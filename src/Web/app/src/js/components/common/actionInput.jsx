import React from 'react';
import Input from './input.jsx';

class ActionInput extends React.Component{
    render (){
        return (
            <div className="action-input">
                <Input
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.onChange}/>

                <span className="action-button" onClick={this.props.onActionClick}>
                     {this.props.actionName}
                </span>
            </div>
        );
    }
}

ActionInput.propTypes = {
    type: React.PropTypes.string,
    actionName: React.PropTypes.string,
    onActionClick: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default ActionInput;
