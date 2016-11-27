// Require dependencies
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

// Components
let ToDoApp = require('TodoApp');

// Redux
let actions = require('actions');
let store = require('configureStore').configure();

store.subscribe(() => {
    console.log('New state', store.getState());
});

store.dispatch(actions.addTodo('Do something'));
store.dispatch(actions.setSearchText('Wut?'));
store.dispatch(actions.toggleShowCompleted());


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
    <ToDoApp/>,
    document.getElementById('app')
);
