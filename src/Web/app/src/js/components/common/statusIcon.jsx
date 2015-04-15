import React from 'react';
import tcStatuses from '../../constants/tcStatuses.js';
import classNames from 'classnames';

import Icon from './Icon.jsx';

class StatusIcon extends React.Component{
    render(){
        var iconName;
        switch(this.props.status){
            case tcStatuses.design:
                iconName = 'status-design';
                break;
            case tcStatuses.waitingForApproval:
                iconName = 'status-waiting';
                break;
            case tcStatuses.ready:
                iconName = 'status-ready';
                break;
            default:
                return null;
        }

        var classes = classNames(this.props.className, 'comm-status-icon', iconName, {
            'colors': this.props.enableColors
        });

        return (
            <span className={classes}>
                <Icon icon={iconName} />
            </span>
        )
    }
}

StatusIcon.propTypes = {
    status: React.PropTypes.string,
    enableColors: React.PropTypes.bool
}

export default StatusIcon;
