import React from 'react';

class AppHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="app-header">
              <div className="app-name">
                <span className="name">Test Case Viewer</span>
                <span className="version">v {window.version}</span>
              </div>
            </div>
        );
    }
}

AppHeader.propTypes = {};

export default AppHeader;
