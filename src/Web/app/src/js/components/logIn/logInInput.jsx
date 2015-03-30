import React from 'react';

class LogInInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    handleValueChange(event){
        this.setState({
            value: event.target.value
        });
        this.props.onChange();
    }

    render(){
        return (
            <div className="labeled-input">
                <input type={this.props.type} value={this.state.value} placeholder={this.props.placeholder} onChange={this.props.onChange.bind(this)}></input>
                <label>{this.props.label}</label>
            </div>
        );
    }
}

LogInInput.propTypes = {
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    type: React.PropTypes.string 
};

export default LogInInput;
