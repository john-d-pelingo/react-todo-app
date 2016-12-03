// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

// Redux
import {Provider} from 'react-redux';

import firebase from 'app/firebase/';
import router from 'app/router/';

// Redirect the user
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // If user argument is present then he/she is logged in
        // Save uid in the redux store
        store.dispatch(actions.login(user.uid));
        // Grab to do of logged in user
        store.dispatch(actions.startAddTodos());
        // Swap out the URL with something new
        hashHistory.push('/todos');
    } else {
        // If user argument is missing then he/she is logged out
        store.dispatch(actions.logout());
        hashHistory.push('/');
    }
});

// My Redux
import * as actions from 'actions';
import * as _store from 'configureStore';
let store = _store.configure();

// Fire up foundation
$(document).foundation();

// Load foundation (css!),
// inject to HTML (style!),
// fire the sass loader (sass!)
require('style!css!sass!applicationStyles');

// Render to the HTML DOM
ReactDOM.render(
    // The ToDoApp component as well as all of its children are gonna be able to access
    // the data on the store as well as the dispatch actions
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
