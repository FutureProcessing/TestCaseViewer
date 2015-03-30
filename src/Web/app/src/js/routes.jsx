import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/app.jsx';
import LogIn from './components/logIn/logIn.jsx';
import TestCaseViewer from './components/testCaseViewer/testCaseViewer.jsx';


export default (
    <Route handler={App}>
        <Route path="/LogIn" name="LogIn" handler={LogIn} />
        <Route path="/TestCaseViewer" name="TestCaseViewer" handler={TestCaseViewer} />
    </Route>
);
