import React from 'react';
import classNames from 'classnames';

class QueryButton extends React.Component{
    render(){
        var classes = classNames('query-button', this.props.className, {
            'active': this.props.isActive
        });

        return(
            <div
                className={classes}
                onClick={this.props.onClick}>
                {this.props.value}
            </div>

        );
    }
}

QueryButton.propTypes = {
    isActive: React.PropTypes.Bool,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    onClick: React.PropTypes.func
}

export default QueryButton;
