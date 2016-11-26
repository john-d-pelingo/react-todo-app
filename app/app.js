'use strict';

// Require dependencies
var React = require('react');
var ReactDOM = require('react-dom');
// ES6/ES2015: Object destructuring
// Pull off four new variables

var _require = require('react-router'),
    Route = _require.Route,
    Router = _require.Router,
    IndexRoute = _require.IndexRoute,
    hashHistory = _require.hashHistory;
// ES5
// let Route = require('react-router').Route;
// let Router = require('react-router').Router;
// let IndexRouter = require('react-router').IndexRouter;
// let hashHistory = require('react-router').hashHistory;

// Components


var Main = require('Main');
var Timer = require('Timer');
var Countdown = require('Countdown');

// Load foundation (css!) and inject to HTML (style!)
// require('style!css!foundation-sites/dist/foundation.min.css');

// Fire up foundation
$(document).foundation();

// Same as above for app.scss plus fire the sass loader (sass!)
require('style!css!sass!applicationStyles');

// Render to the HTML DOM
// The Main component will be in charge of rendering the main app
// The weather component is our index/home
ReactDOM.render(React.createElement(
    Router,
    { history: hashHistory },
    React.createElement(
        Route,
        { path: '/', component: Main },
        React.createElement(IndexRoute, { component: Timer }),
        React.createElement(Route, { path: 'countdown', component: Countdown })
    )
), document.getElementById('app'));

//# sourceMappingURL=app.js.map