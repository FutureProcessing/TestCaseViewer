import React from 'react';

class Home extends React.Component{
    static willTransitionTo(transition){
        transition.redirect('/testcases');
    }

    render(){
        return (
            <div />
        );
    }
}

export default Home;
