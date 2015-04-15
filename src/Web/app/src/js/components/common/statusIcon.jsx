import React from 'react';
import tcStatuses from '../../constants/tcStatuses.js';

import Icon from './Icon.jsx';

class statusIcon extends React.Component{
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
        }

        return (
            <span className="status-icon">
                <Icon icon={iconName} />
            </span>
        )
    }
}

export default statusIcon;
