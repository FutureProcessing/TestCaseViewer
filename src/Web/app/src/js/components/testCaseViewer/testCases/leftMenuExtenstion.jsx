import React from 'react/addons';

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

class LeftMenuExtension extends React.Component{
    render(){
        var content = this.props.isOpen? (
            <div className="left-menu-extension">
                {this.props.children}
            </div>
        ): null;

        return <CSSTransitionGroup transitionName="extension">{content}</CSSTransitionGroup>;
    }
}

LeftMenuExtension.propTypes = {
    isOpen: React.PropTypes.bool
}

export default LeftMenuExtension;
