import React from 'react';
import classNames from 'classnames';
import Icon from '../../common/Icon.jsx';

class QueryButton extends React.Component{
    render(){
        var classes = classNames('query-button', this.props.className, {
            'active': this.props.isActive
        });

        return(
            <div
                className={classes}>
                <div className="query-button-value">
                    {this.props.value}
                </div>
                <div className="query-button-icon"
                    onClick={this.props.onClick}>
                    <Icon icon="arrow-down"  />
                </div>
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
