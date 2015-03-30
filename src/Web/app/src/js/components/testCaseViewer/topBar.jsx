import React from 'react';
import classNames from 'classnames';
import UserStore from '../../stores/userStore.js';
import UserButton from './userButton.jsx';

class TopBar extends React.Component{
    constructor(props){
        super(props);
        var userData = UserStore.getData();
        this.state = {
            username: userData.username
        };
    }

    componentDidMount(){
        UserStore.addEventListener(this.handleStoreChange.bind(this));
    }

    componentWillUnmount(){
        UserStore.removeEventListener(this.handleStoreChange.bind(this));
    }

    handleStoreChange(){
        var userData = UserStore.getData();
        this.setState({username: userData.username});
    }

    render(){
        return (
            <div className="top-bar">
                <UserButton
                    onLogoutClick={this.props.onLogOffClick.bind(this)}
                    username={this.state.username}/>
            </div>
        );
    }
}

TopBar.propTypes = {
    onLogOffClick: React.PropTypes.func
};

export default TopBar;
