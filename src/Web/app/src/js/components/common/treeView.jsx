import React from 'react';
import classNames from 'classnames';

import Toggle from './toggle.jsx';

class TreeView extends React.Component{
    render(){
        var children = this.props.parentNode.children || [];
        var props = this.props;
        var nodes = children.map(node => {
            var element;
            if(node.type === 'folder'){
                element = (
                    <li>
                        <Toggle open={true} header={<span className="folder-name" >{node.name} </span>} >
                            <TreeView
                                onLeafClick={props.onLeafClick}
                                parentNode={node}
                                selectedNode={props.selectedNode}/>
                        </Toggle>
                    </li>
                );
            }else{
                var classes = classNames('leaf', {
                    'active': props.selectedNode === node.path
                });
                element = (
                    <li className={classes} onClick={props.onLeafClick.bind(this, node.path, node.name)}>{node.name}</li>
                );
            }

            return element;
        });

        return(
            <ul className="tree-view">
                {nodes}
            </ul>
        );
    }
}

TreeView.propTypes = {
    parentNode: React.PropTypes.array,
    onLeafClick: React.PropTypes.func,
    selectedNode: React.PropTypes.string
};

export default TreeView;
