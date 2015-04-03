import React from 'react';
import classNames from 'classnames';

import Toggle from './toggle.jsx';

class TreeView extends React.Component{
    render(){
        var children = this.props.parentNode.children || [];
        var nodes = children.map(node => {
            var element;
            if(node.type === 'folder'){
                var classes = classNames('folder-name', {
                    'empty': node.children.length === 0
                });
                element = (
                    <li>
                        <Toggle open={this.props.open} header={<span className={classes} >{node.name} </span>} >
                            <TreeView
                                onLeafClick={this.props.onLeafClick}
                                parentNode={node}
                                selectedNode={this.props.selectedNode}
                                open={this.props.open}/>
                        </Toggle>
                    </li>
                );
            }else{
                var classes = classNames('leaf', {
                    'active': this.props.selectedNode === node.path
                });
                element = (
                    <li className={classes} onClick={this.props.onLeafClick.bind(this, node.path, node.name)}>{node.name}</li>
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
    selectedNode: React.PropTypes.string,
    open: React.PropTypes.bool
};

export default TreeView;
