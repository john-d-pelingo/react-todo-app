let React = require('react');

let TodoSearch = require('TodoSearch');
let TodoList = require('TodoList');
let AddTodo = require('AddTodo');
let uuid = require('node-uuid');

let TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText   : '',
            todos        : [
                {
                    id       : uuid(),
                    text     : 'Play with the cat',
                    completed: false,
                },
                {
                    id       : uuid(),
                    text     : 'Clean the room',
                    completed: true,
                },
                {
                    id       : uuid(),
                    text     : 'Study!!!',
                    completed: false,
                },
                {
                    id       : uuid(),
                    text     : 'Eat something',
                    completed: true,
                }
            ]
        };
    },
    handleAddTodo  : function (text) {
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
    handleToggle   : function (id) {
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
    handleSearch   : function (showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText   : searchText.toLowerCase()
        });
    },
    render         : function () {
        let {todos} = this.state;

        return (
            <div className="todo-app">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos} onToggle={this.handleToggle}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;