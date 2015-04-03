import React from 'react';

class LeftMenuExtension extends React.Component{
    render(){
        var content = this.props.isOpen? (
            <div className="left-menu-extension">
                {this.props.children}
            </div>
        ): null;

        return content;
    }
}

LeftMenuExtension.propTypes = {
    isOpen: React.PropTypes.bool
}

export default LeftMenuExtension;
