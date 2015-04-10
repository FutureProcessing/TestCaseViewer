import React from 'react/addons';
import ToasterStore from '../../stores/toasterStore.js';
import ApiActionCreators from '../../actions/apiActionCreators.js';
import ToastTypes from '../../constants/toastTypes.js';
import Toast from './toast.jsx';
import TimeoutTransitionGroup from '../timeoutTransitionGroup.jsx';
//TODO: change TimeoutTransitionGroup to CSSTransitionGroup
// var CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Toaster extends React.Component{
    constructor(props){
        super(props);
        ApiActionCreators.removeAllToasts();
        
        this.state = {
            toasts: []
        };
        this.storeChangeHandler = this.handleStoreChange.bind(this);
    }

    componentDidMount() {
        ToasterStore.addEventListener(this.storeChangeHandler);
    }

    componentWillUnmount() {
        ToasterStore.removeEventListener(this.storeChangeHandler);
    }

    handleStoreChange(){
        var toasts = ToasterStore.getToasts();
        this.setState({toasts});
    }

    handleRemoveClick(toast){
        ApiActionCreators.removeToast(toast.timestamp);
    }

    render(){
        var toasts = this.state.toasts.map((toast) => {
            return (
                <Toast key={toast.timestamp}
                    onRemoveClick={this.handleRemoveClick.bind(this, toast)}
                    title={toast.title}
                    type={toast.type}
                    content={toast.content}
                    autoRemove={toast.autoRemove} />
            );
        });

        return (
            <div className="toaster">
                <ul>
                    <TimeoutTransitionGroup
                        enterTimeout={500}
                        leaveTimeout={500}
                        transitionName="toast">
                        {toasts}
                    </TimeoutTransitionGroup>
                </ul>
            </div>
        );
    }
}

export default Toaster;
