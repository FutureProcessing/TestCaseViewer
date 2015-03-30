import React from 'react';
// import AppStore from '../stores/appStore.js';
import ViewActionCreators from '../actions/viewActionCreators.js';
import {RouteHandler} from 'react-router';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    //
    // componentDidMount(){
    //     AppStore.addEventListener(this.handleStoreChange.bind(this));
    // }
    //
    // componentWillUnmount() {
    //     AppStore.removeEventListener(this.handleStoreChange.bind(this));
    // }


    // handleButtonClick(){
    //
    // }

    render() {
        return (
            <RouteHandler/>
        );
    }
}
//
// var routes = (
//   <Route handler={App}>
//     <Route name="login" handler={Login}/>
//     <Route name="logout" handler={Logout}/>
//     <Route name="about" handler={About}/>
//     <Route name="dashboard" handler={Dashboard}/>
//   </Route>
// );
//
// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.getElementById('example'));
// });

export default App;
