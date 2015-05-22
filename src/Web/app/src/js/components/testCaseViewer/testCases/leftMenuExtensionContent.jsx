import React from 'react';
import ScrollArea from 'react-scrollbar';

var scrollAreaCss = require('style!css!react-scrollbar/dist/css/scrollbar.css');

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
