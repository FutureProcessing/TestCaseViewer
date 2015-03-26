import React from 'react';
import AppStore from '../stores/appStore.js';
import ViewActionCreators from '../actions/viewActionCreators.js';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = AppStore.getData();
    }

    componentDidMount(){
        AppStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount() {
        AppStore.removeEventListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange(){
        var data = AppStore.getData();
        this.setState({name: data.name});
    }

    handleButtonClick(){
        ViewActionCreators.add(':)');
    }

    render() {
        return (
            <div>
                {this.state.name}
                <button onClick={this.handleButtonClick}>ADD</button>
            </div>
        );
    }
}

export default App;
