let redux = require('redux');

let {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

export let configure = () => {
    let reducer = redux.combineReducers({
        searchText   : searchTextReducer,
        showCompleted: showCompletedReducer,
        todos        : todosReducer
    });

    let store = redux.createStore(reducer,
        // f => f is a simplified arrow function
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return store;
};