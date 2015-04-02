import React from 'react';

class ButtonGroup extends React.Component{
    render(){
        return (
            <div className="comm-button-group">
                {this.props.children}
            </div>
        );
    }
}

export default ButtonGroup;
