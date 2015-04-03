import React from 'react';

class TreeView extends React.Component{
    render(){
        var children = this.props.parentNode.children || [];
        var props = this.props;
        var nodes = children.map(node => {
            var element;
            if(node.type === 'folder'){
                element = <li>{node.name}<TreeView onLeafClick={props.onLeafClick} parentNode={node}/></li>
            }else{
                element = <li onClick={props.onLeafClick.bind(this, node.path, node.name)}>{node.name}</li>
            }

            return element;
        });

        return(
            <ul>
                {nodes}
            </ul>
        );
    }
}

TreeView.propTypes = {
    parentNode: React.PropTypes.array,
    onLeafClick: React.PropTypes.func
};

export default TreeView;
