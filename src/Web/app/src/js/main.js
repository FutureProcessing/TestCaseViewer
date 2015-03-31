import React from 'react';
import routes from './routes.jsx';
import Router from 'react-router';
import RouterContainer from './routerContainer.js';

var router = Router.run(routes, (Handler) => {
    React.render(React.createElement(Handler, null), document.getElementById("main"));
});
RouterContainer.set(router);
