import React from 'react';
import classNames from 'classnames';

import Toggle from './toggle.jsx';
import Icon from '../common/Icon.jsx';

class TreeView extends React.Component{
    render(){
        var children = this.props.parentNode.children || [];
        var nodes = children.map(node => {
            var element;
            var value = '';
            var text = '';

            if(this.props.isNode(node)){
                element = (
                    <li>
                        <Toggle
                            open={this.isNodeOpen(node)}
                            header={(
                                <span className={this.classesForNode(node)} >
                                    <Icon icon="arrow-down" className="folder-icon"/>
                                    {this.props.text(node)}
                                </span>
                            )}>
                            <TreeView
                                onLeafClick={this.props.onLeafClick}
                                parentNode={node}
                                selectedNode={this.props.selectedNode}                            
                                value={this.props.value}
                                text={this.props.text}
                                children={this.props.children}
                                isNode={this.props.isNode}
                                isLeafDisabled={this.props.isLeafDisabled}/>
                        </Toggle>
                    </li>
                );

            }else{
                element = (
                    <li className={this.classesForLeaf(node)}
                        onClick={this.handleLeafClick.bind(this, node)}>
                        {this.props.text(node)}
                    </li>
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

    handleLeafClick(node){
        if(!this.props.isLeafDisabled(node) && typeof this.props.onLeafClick === 'function'){
            this.props.onLeafClick.call(this, this.props.value(node), this.props.text(node));
        }
    }

    classesForNode(node){
        return classNames('folder-name', {
            'empty': this.props.children(node).length === 0
        });
    }

    classesForLeaf(node){
        return classNames('leaf', {
            'active': this.props.selectedNode === this.props.value(node).path,
            'disabled': this.props.isLeafDisabled(node)
        });
    }

    isNodeOpen(node) {
      var nodePath = this.props.value(node).path;

      return this.props.selectedNode.startsWith(nodePath);
    }
}

TreeView.propTypes = {
    parentNode: React.PropTypes.object,
    onLeafClick: React.PropTypes.func,
    selectedNode: React.PropTypes.string,
    value: React.PropTypes.func,
    text: React.PropTypes.func,
    children :React.PropTypes.func,
    isNode: React.PropTypes.func,
    isLeafDisabled: React.PropTypes.func
};

TreeView.defaultProps = {
    value: x => x,
    text: x => x.text,
    children : x => x.children,
    isNode: x => x.type === 'node',
    isLeafDisabled: () => false
};

export default TreeView;
