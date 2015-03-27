import React from 'react';

class LogIn extends React.Component{
    render(){
        return(
            <div>
                <h1>Please log in</h1>
                <label>user</label>
                <input type="text"></input>

                <label>password</label>
                <input type="text"></input>
            </div>
        )
    }
}

export default LogIn
