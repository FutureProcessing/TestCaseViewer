import React from 'react';
// import perfectScrollbar from 'perfect-scrollbar';
import ScrollArea from '../../common/scrollArea/scrollArea.jsx';

class LeftMenuExtensionContent extends React.Component{
    render(){
        return (
            <ScrollArea className="left-menu-extension" speed={0.5}>
                <div ref="treeView">
                    {this.props.children}
                </div>

            </ScrollArea>
        );
    }
}

export default LeftMenuExtensionContent;
