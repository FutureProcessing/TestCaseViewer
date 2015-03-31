import React from 'react';
import classNames from 'classnames';

class PogressButtonBase extends React.Component{
    render(){
        var classes = classNames({
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

PogressButtonBase.propTypes = {
    onClick: React.PropTypes.func,
    inProgress: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default PogressButtonBase;
