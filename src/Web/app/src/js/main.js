//window.React = require('react'); //TODO: Only for develping. Remove window.
import React from 'react';
import App from './components/app.jsx';

var routes = (
    <Route handler={App}>
        <Route name="LogIn" handler={LogIn} />
        <Route name="TCViewer" handler={LogIn} />
    </Route>
);

Router.run(routes, (Handler) => {
    React.render(<Handler/>, document.getElementById("main"));
})

// React.render( React.createElement(App, null), document.getElementById("main"));
