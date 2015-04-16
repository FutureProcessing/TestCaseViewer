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
                            open={this.props.open}
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
                                open={this.props.open}
                                value={this.props.value}
                                text={this.props.text}
                                children={this.props.children}
                                isNode={this.props.isNode}/>
                        </Toggle>
                    </li>
                );

            }else{
                element = (
                    <li className={this.classesForLeaf(node)}
                        onClick={this.props.onLeafClick.bind(this, this.props.value(node), this.props.text(node))}>
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

    classesForNode(node){
        return classNames('folder-name', {
            'empty': this.props.children(node).length === 0
        });
    }

    classesForLeaf(node){
        return classNames('leaf', {
            'active': this.props.selectedNode === this.props.text(node)
        });
    }
}

TreeView.propTypes = {
    parentNode: React.PropTypes.object,
    onLeafClick: React.PropTypes.func,
    selectedNode: React.PropTypes.string,
    open: React.PropTypes.bool,
    value: React.PropTypes.func,
    text: React.PropTypes.func,
    children :React.PropTypes.func,
    isNode: React.PropTypes.func,
};

export default TreeView;
