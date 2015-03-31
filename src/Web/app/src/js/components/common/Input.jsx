import React from 'react';

class Input extends React.Component{
    render (){
        return (
            <input
                className="input"
                type={this.props.type || 'text'}
                value={this.props.value}
                onChange={this.props.onChange}/>
        );
    }
}

Input.propTypes = {
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
};

export default Input;
