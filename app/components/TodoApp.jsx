let React = require('react');
let uuid = require('node-uuid');

let TodoSearch = require('TodoSearch');
let TodoList = require('TodoList');
let AddTodo = require('AddTodo');
let TodoAPI = require('TodoAPI');

let TodoApp = React.createClass({
    getInitialState   : function () {
        return {
            showCompleted: false,
            searchText   : '',
            // Load the todos
            todos        : TodoAPI.getTodos()
        };
    },
    // Save the todos
    componentDidUpdate: function () {
        TodoAPI.setTodos(this.state.todos);
    },
    handleAddTodo     : function (text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    // Generate random ID
                    id       : uuid(),
                    text     : text,
                    completed: false
                }
            ]
        })
    },
    handleToggle      : function (id) {
        let updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        this.setState({
            todos: updatedTodos
        });
    },
    handleSearch      : function (showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText   : searchText.toLowerCase()
        });
    },
    render            : function () {
        let {todos, showCompleted, searchText} = this.state;
        // Filter the todos
        let filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

        return (
            <div className="todo-app">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;