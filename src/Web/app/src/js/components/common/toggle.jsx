import React from 'react';

class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleClick(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        return(
            <div className={this.props.className} onClick={this.handleClick.bind(this)}>
                {this.props.header}
                {this.state.isOpen? (
                    <div className=>
                        {this.props.children}
                    </div>) : null}
            </div>
        );
    }
}

Toggle.propTypes = {
    header: React.PropTypes.element
}

export default Toggle;
