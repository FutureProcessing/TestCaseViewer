import React from 'react';
import classNames from 'classnames';

class PogressButton extends React.Component{
    render(){
        var classes = classNames({
            'button': true,
            'in-progress': this.props.inProgress
        }, this.props.className);

        return (
            <button
                onClick={this.props.onClick.bind(this)}
                className={classes}>
                {this.props.children}
            </button>
        );
    }
}

PogressButton.propTypes = {
    onClick: React.PropTypes.func,
    inProgress: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default PogressButton;
