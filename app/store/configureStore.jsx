// let redux = require('redux');
import * as redux from 'redux';
// With thunk we can have action generators that don't return objects like functions
// where we can do asynchronous code
import thunk from 'redux-thunk';

// let {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');
import {searchTextReducer, showCompletedReducer, todosReducer, authReducer} from 'reducers';

// The parameter with the default state is used for test purposes in this case
export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        searchText   : searchTextReducer,
        showCompleted: showCompletedReducer,
        todos        : todosReducer,
        auth         : authReducer
    });

    let store = redux.createStore(
        reducer,
        initialState,
        // The 3rd parameter will be handled correctly by redux
        // if we provide a 2nd parameter as the state
        // Compose all of our middleware one after another
        redux.compose(
            redux.applyMiddleware(thunk),
            // f => f is a simplified arrow function
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
};