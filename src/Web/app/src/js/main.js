//window.React = require('react'); //TODO: Only for develping. Remove window.
import React from 'react';
import App from './components/app.jsx';
 
React.render( React.createElement(App, null), document.getElementById("main"));
