import React from 'react';
import classNames from 'classnames';

class Swirl extends React.Component{
    render(){
        var classes = classNames('swirl', {
            'big': this.props.size === 'big',
            'medium': this.props.size === 'medium',
            'small': this.props.size === 'small'
        }, this.props.className);

        return(
            <div className={classes}>
            </div>
        );
    }
}

Swirl.propTypes = {
    size: React.PropTypes.oneOf(['big', 'medium', 'small'])
};

export default Swirl;
