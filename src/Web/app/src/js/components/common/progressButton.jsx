import React from 'react';
import classNames from 'classnames';
import PogressButtonBase from './progressButtonBase.jsx';

class PogressButton extends React.Component{
    render(){
        var classes = classNames('button', this.props.className);

        return (
            <PogressButtonBase
                onClick={this.props.onClick}
                inProgress={this.props.inProgress}
                className={classes}
                buttonType={this.props.buttonType} >
                {this.props.children}
            </PogressButtonBase>
        );
    }
}

PogressButton.propTypes = {
    onClick: React.PropTypes.func,
    inProgress: React.PropTypes.bool,
    className: React.PropTypes.string,
    buttonType: React.PropTypes.oneOf(['success', 'error', 'info', 'warning', 'normal'])
};

export default PogressButton;
