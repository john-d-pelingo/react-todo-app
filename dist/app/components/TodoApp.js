'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var TodoSearch = require('TodoSearch');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
    displayName: 'TodoApp',

    getInitialState: function getInitialState() {
        return {
            showCompleted: false,
            searchText: '',
            // Load the todos
            todos: TodoAPI.getTodos()
        };
    },
    // Save the todos
    componentDidUpdate: function componentDidUpdate() {
        TodoAPI.setTodos(this.state.todos);
    },
    handleAddTodo: function handleAddTodo(text) {
        this.setState({
            todos: [].concat(_toConsumableArray(this.state.todos), [{
                // Generate random ID
                id: uuid(),
                text: text,
                completed: false,
                createdAt: moment().unix(),
                completedAt: undefined
            }])
        });
    },
    handleToggle: function handleToggle(id) {
        var updatedTodos = this.state.todos.map(function (todo) {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? moment().unix() : undefined;
            }

            return todo;
        });

        this.setState({
            todos: updatedTodos
        });
    },
    handleSearch: function handleSearch(showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    },
    render: function render() {
        var _state = this.state,
            todos = _state.todos,
            showCompleted = _state.showCompleted,
            searchText = _state.searchText;
        // Filter the todos

        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

        return React.createElement(
            'div',
            { className: 'todo-app' },
            React.createElement(TodoSearch, { onSearch: this.handleSearch }),
            React.createElement(TodoList, { todos: filteredTodos, onToggle: this.handleToggle }),
            React.createElement(AddTodo, { onAddTodo: this.handleAddTodo })
        );
    }
});

module.exports = TodoApp;
//# sourceMappingURL=TodoApp.js.map