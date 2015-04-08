import React from 'react/addons';
import classNames from 'classnames';

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: props.open || false
        }
    }

    handleClick(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){
        var headerClasses = classNames({
            'closed': !this.state.isOpen
        });
        return(
            <div className={this.props.className}>
                <span className={headerClasses} onClick={this.handleClick.bind(this)}>{this.props.header}</span>
                <CSSTransitionGroup transitionName="toggle">
                    {this.state.isOpen? (
                        <div>
                            {this.props.children}
                        </div>
                    ) : null}
                </CSSTransitionGroup>
            </div>
        );
    }
}

Toggle.propTypes = {
    header: React.PropTypes.element,
    open: React.PropTypes.bool
}

export default Toggle;
