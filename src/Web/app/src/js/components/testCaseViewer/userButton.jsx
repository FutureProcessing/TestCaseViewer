import React from 'react';
import classNames from 'classnames';

class TestCase extends React.Component{
    render(){
        var classes = classNames({
            'user-button': true,
            'in-progress': this.props.inProgress
        });
        var photoUrl = `${window.baseUrl}profile/${this.props.username}/image`;
        var photo = this.props.username? <img src={photoUrl} />: null;

        return (
            <div className={classes}>
                {photo}
                <div className="name " data-logout="Log Out" onClick={this.props.onLogoutClick.bind(this)}>{this.props.displayName}</div>
            </div>
        );
    }
}

TestCase.propTypes = {
    onLogoutClick: React.PropTypes.func,
    username: React.PropTypes.string,
    displayName: React.PropTypes.string
};

export default TestCase;
