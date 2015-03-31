import React from 'react';
import ToasterStore from '../../stores/toasterStore.js';
import ViewActionCreators from '../../actions/viewActionCreators.js';
import ToastTypes from '../../constants/toastTypes.js';
import Toast from './toast.jsx';


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
        ViewActionCreators.removeToast(toast.timestamp);
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
                {toasts}
            </ul>
        </div>);
    }
}

export default Toaster;
