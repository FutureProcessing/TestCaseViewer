import React from 'react';
// import perfectScrollbar from 'perfect-scrollbar';
import ScrollArea from '../../common/scrollArea/scrollArea.jsx';

class LeftMenuExtensionContent extends React.Component{
    componentDidMount(){
        // var component = React.findDOMNode(this);
        // setTimeout(() => {
        //     perfectScrollbar.initialize(component, {
        //         wheelSpeed: 1,
        //         wheelPropagation: true,
        //         minScrollbarLength: 20
        //     });
        // }, 200); //FIXME: Ugly fix connected with open component animation, Find better solution and remove setTimeout
    };

    render(){
        return (
            <ScrollArea className="left-menu-extension">

                <div ref="treeView">
                    {this.props.children}
                </div>
                
            </ScrollArea>
        );
    }
}

export default LeftMenuExtensionContent;
