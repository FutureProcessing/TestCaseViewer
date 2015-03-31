import React from 'react';

class Input extends React.Component{
    render (){
        return (
            <div className="action-input">
                <Input
                    type={this.props.type}/>

                <span className="action-button">
                     {this.props.actionName}
                </span>
            </div>

        );
    }
}

Input.propTypes = {
    type: React.PropTypes.string,
    actionName: React.PropTypes.string,
    actionName: React.PropTypes.string
};

export default Input;
