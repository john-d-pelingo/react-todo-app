import React from 'react';
let {Route, Router, IndexRoute, hashHistory} = require('react-router');

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';


// Middleware functions for the respective routes where they check if user has rights to access the page
// replace: let's us switch URLs
// Asynchronous
let requireLogin = (nextState, replace, next) => {
    // If nobody is logged in
    if (!firebase.auth().currentUser) {
        // Like hashHistory.push('/');
        replace('/');
    }
    next();
};
let redirectIfLoggedIn= (nextState, replace, next) => {
    // If is logged in
    if (firebase.auth().currentUser) {
        // Like hashHistory.push('/');
        replace('/todos');
    }
    next();
};

export default (
    <Router history={hashHistory}>
        {/* Parent route that wraps all of our other components */}
        <Route path="/">
            <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
            <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        </Route>
    </Router>
);