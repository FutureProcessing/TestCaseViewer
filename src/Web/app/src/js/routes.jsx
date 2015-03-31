import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/app.jsx';
import LogIn from './components/logIn/logIn.jsx';
import TestCaseViewer from './components/testCaseViewer/testCaseViewer.jsx';
import TestCases from './components/testCaseViewer/testCases.jsx';
import TestCase from './components/testCaseViewer/testCase.jsx';
import Home from './components/testCaseViewer/home.jsx';

export default (
    <Route handler={App}>
        <Route path="/" handler={TestCaseViewer} >
            <DefaultRoute handler={Home} />
            <Route name="testcases" handler={TestCases} >
                <Route name="tc" path="tc/:id" handler={TestCase} />
            </Route>

        </Route>
        <Route name="login" handler={LogIn} />
    </Route>
);
