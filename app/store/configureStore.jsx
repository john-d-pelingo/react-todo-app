let redux = require('redux');

let {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

// The parameter with the default state is used for test purposes in this case
export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        searchText   : searchTextReducer,
        showCompleted: showCompletedReducer,
        todos        : todosReducer
    });

    let store = redux.createStore(
        reducer,
        initialState,
        // The 3rd parameter will be handled correctly by redux
        // f => f is a simplified arrow function
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return store;
};