import React from 'react';
import ToastTypes from '../../constants/toastTypes.js';
import classNames from 'classnames';

import Icon from '../common/Icon.jsx';

class Toast extends React.Component{
    componentDidMount(){
        if(this.props.autoRemove){
            setTimeout(function(){
                this.props.onRemoveClick();
            }.bind(this), 4000);
        }
    }

    render(){
        var classes = classNames('toast', {
            'success': this.props.type === ToastTypes.SUCCESS,
            'error': this.props.type === ToastTypes.ERROR,
            'warning': this.props.type === ToastTypes.WARNING,
            'info': this.props.type === ToastTypes.INFO
        });

        return(
            <li className={classes}>
                <div className="toast-title">{this.props.title}</div>
                <div className="toast-content">{this.props.content}</div>
                <span className="close-icon"
                    onClick={this.props.onRemoveClick}><Icon icon="close" /></span>
            </li>
        );
    }
}

Toast.propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.string,
    content: React.PropTypes.string,
    onRemoveClick: React.PropTypes.func,
    autoRemove: React.PropTypes.bool
}

export default Toast;
