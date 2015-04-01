import React from 'react';
import classNames from 'classnames';

class PogressButtonBase extends React.Component{
    render(){
        var buttonType = this.props.buttonType || 'normal';
        console.log(this.props.buttonType, buttonType === 'success');
        var classes = classNames({
            'in-progress': this.props.inProgress,
            'success': buttonType === 'success',
            'error': buttonType === 'error',
            'info': buttonType === 'info',
            'warning': buttonType === 'warning',
            'normal': buttonType === 'normal'
        }, this.props.className);

        return (
            <button
                onClick={this.props.onClick}
                className={classes}>
                {this.props.children}
            </button>
        );
    }
}

PogressButtonBase.propTypes = {
    onClick: React.PropTypes.func,
    inProgress: React.PropTypes.bool,
    className: React.PropTypes.string,
    buttonType: React.PropTypes.oneOf(['success', 'error', 'info', 'warning', 'normal'])
};

export default PogressButtonBase;
