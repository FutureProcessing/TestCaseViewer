import React from 'react';

class Input extends React.Component{
    render (){
        return (
            <input
                className="tcv-input"
                type={this.props.type || 'text'}/>
        );
    }
}

Input.propTypes = {
    type: React.PropTypes.string
};

export default Input;
