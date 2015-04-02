import React from 'react';
import classNames from 'classnames';

class PogressButtonBase extends React.Component{
    render(){
        var buttonType = this.props.buttonType || 'normal';
        var classes = classNames({
            'in-progress': this.props.inProgress,
            'success': buttonType === 'success',
            'error': buttonType === 'error',
            'info': buttonType === 'info',
            'warning': buttonType === 'warning',
            'normal': buttonType === 'normal',
            'disabled': this.props.disabled
        }, this.props.className);

        return (
            <button
                onClick={() => {
                    if(!this.props.disabled && this.props.onClick) {
                        this.props.onClick();
                    }
                }}
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
    disabled: React.PropTypes.bool,
    buttonType: React.PropTypes.oneOf(['success', 'error', 'info', 'warning', 'normal'])
};

export default PogressButtonBase;
