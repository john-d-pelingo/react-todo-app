'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var Todo = require('Todo');

var TodoList = React.createClass({
    displayName: 'TodoList',

    render: function render() {
        var _this = this;

        var todos = this.props.todos;


        var renderTodos = function renderTodos() {
            // If there are no todos
            if (todos.length === 0) {
                return React.createElement(
                    'p',
                    { className: 'container__message' },
                    'Nothing Todo'
                );
            }
            // When we are iterating over an array and we are generating multiple instances of our component
            // we have to give them a unique key prop
            // It is used internally by React to keep track of the individual components
            return todos.map(function (todo) {
                {
                    /* {...todo} is object spread operator
                     */
                }
                return React.createElement(Todo, _extends({ key: todo.id }, todo, { onToggle: _this.props.onToggle }));
            });
        };
        return React.createElement(
            'div',
            { className: 'todo-list' },
            renderTodos()
        );
    }
});

module.exports = TodoList;
//# sourceMappingURL=TodoList.js.map