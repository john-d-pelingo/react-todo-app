// Require dependencies
// React
const React = require('react');
const ReactDOM = require('react-dom');
// ES6/ES2015: Object destructuring
// Pull off four new variables
let {Route, Router, IndexRoute, hashHistory} = require('react-router');
// ES5
// let Route = require('react-router').Route;
// let Router = require('react-router').Router;
// let IndexRouter = require('react-router').IndexRouter;
// let hashHistory = require('react-router').hashHistory;

// Redux
let {Provider} = require('react-redux');

// Components
let ToDoApp = require('TodoApp');

// My Redux
let actions = require('actions');
let store = require('configureStore').configure();

let TodoAPI = require('TodoAPI');

store.subscribe(() => {
    let state = store.getState();
    console.log('New state', state);
    // Get todos that were previously saved
    TodoAPI.setTodos(state.todos);
});

// Create defaults
// store.dispatch(actions.addTodo('Do something'));
// store.dispatch(actions.setSearchText('something'));
// store.dispatch(actions.toggleShowCompleted());

let initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));

// Load foundation (css!) and inject to HTML (style!)
// require('style!css!foundation-sites/dist/foundation.min.css');

// Fire up foundation
$(document).foundation();

// Same as above for app.scss plus fire the sass loader (sass!)
require('style!css!sass!applicationStyles');

// Render to the HTML DOM
// The Main component will be in charge of rendering the main app
// The weather component is our index/home
ReactDOM.render(
    // The ToDoApp component as well as all of its children are gonna be able to access
    // the data on the store as well as the dispatch actions
    <Provider store={store}>
        <ToDoApp/>
    </Provider>,
    document.getElementById('app')
);
