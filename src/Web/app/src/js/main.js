//window.React = require('react'); //TODO: Only for develping. Remove window.
import React from 'react';
//import App from './components/app.jsx';
import routes from './routes.jsx';
import Router from 'react-router';


Router.run(routes, (Handler) => {
    React.render(React.createElement(Handler, null), document.getElementById("main"));
})

// React.render( React.createElement(App, null), document.getElementById("main"));
