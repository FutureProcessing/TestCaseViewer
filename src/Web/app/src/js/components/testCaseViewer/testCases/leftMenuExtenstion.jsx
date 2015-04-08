import React from 'react';
import perfectScrollbar from 'perfect-scrollbar';

import LeftMenuExtensionContent from './leftMenuExtensionContent.jsx';
import TimeoutTransitionGroup from '../../timeoutTransitionGroup.jsx';

class LeftMenuExtension extends React.Component{
    render(){
        var content = this.props.isOpen? (
            <LeftMenuExtensionContent> {this.props.children} </LeftMenuExtensionContent>
        ): null;

        return (
            <TimeoutTransitionGroup
                enterTimeout={200}
                leaveTimeout={200}
                transitionName="extension">
                {content}
            </TimeoutTransitionGroup>
        );
    }
}

LeftMenuExtension.propTypes = {
    isOpen: React.PropTypes.bool
}

export default LeftMenuExtension;
