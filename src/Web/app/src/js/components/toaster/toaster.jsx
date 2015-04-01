import React from 'react/addons';
import ToasterStore from '../../stores/toasterStore.js';
import ApiActionCreators from '../../actions/apiActionCreators.js';
import ToastTypes from '../../constants/toastTypes.js';
import Toast from './toast.jsx';

var CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Toaster extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toasts: []
        };
    }

    componentDidMount() {
        ToasterStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        ToasterStore.removeEventListener(this.handleStoreChange.bind(this));
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

        return (<div className="toaster">
            <ul>
                <CSSTransitionGroup transitionName="toast">
                    {toasts}
                </CSSTransitionGroup>
            </ul>
        </div>);
    }
}

export default Toaster;
