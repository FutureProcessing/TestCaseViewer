import React from 'react';
import Swirl from '../common/swirl.jsx';

class LoadingPage extends React.Component{
    render(){
        return (
            <div className="loading-page">
                <Swirl className="loading-page-swirl"/>
            </div>
        );
    }
}

export default LoadingPage;
