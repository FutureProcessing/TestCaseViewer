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
                className={classes}>
                {this.props.children}
            </PogressButtonBase>
        );
    }
}

PogressButton.propTypes = {
    onClick: React.PropTypes.func,
    inProgress: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default PogressButton;
