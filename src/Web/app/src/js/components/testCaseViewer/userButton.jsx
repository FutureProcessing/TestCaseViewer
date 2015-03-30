import React from 'react';
import classNames from 'classnames';

class TestCase extends React.Component{
    render(){
        var classes = classNames({
            'user-button': true,
            'in-progress': this.props.inProgress
        });
        var photo = this.props.photo? <img src={this.props.photo} />: null;

        return (
            <div className={classes}>
                {photo}
                <div className="name " data-logout="Log Out" onClick={this.props.onLogoutClick.bind(this)}>{this.props.username}</div>
            </div>
        );

        // return (
        //     <div className="user-button">
        //         <button></button>
        //
        //     </div>
        // );
    }
}

TestCase.propTypes = {
    onLogoutClick: React.PropTypes.func,
    photo: React.PropTypes.string,
    username: React.PropTypes.string
};

export default TestCase;
