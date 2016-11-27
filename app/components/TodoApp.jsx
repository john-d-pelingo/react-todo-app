let React = require('react');
let uuid = require('node-uuid');
let moment = require('moment');

let TodoSearch = require('TodoSearch');

// No longer works because we need the connected react component
// let TodoList = require('TodoList');
// The non-connected react component version is only gonna be used in test files
// {TodoList} would be the pure react component (non-connected react component)
// Essentially the TodoList below is the connected react component
import TodoList from 'TodoList';

// No longer works because we need the connected react component
// let AddTodo = require('AddTodo');
import AddTodo from 'AddTodo';

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
                    id         : uuid(),
                    text       : text,
                    completed  : false,
                    createdAt  : moment().unix(),
                    completedAt: undefined
                }
            ]
        })
    },
    // The store handles the toggle now
    // handleToggle      : function (id) {
    //     let updatedTodos = this.state.todos.map((todo) => {
    //         if (todo.id === id) {
    //             todo.completed = !todo.completed;
    //             todo.completedAt = todo.completed ? moment().unix() : undefined;
    //         }
    //
    //         return todo;
    //     });
    //
    //     this.setState({
    //         todos: updatedTodos
    //     });
    // },
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
                <h1 className="page-title">Todo App</h1>
                <div name="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoSearch onSearch={this.handleSearch}/>
                            {
                                /* Now that we have access to the store, we don't need to pass the data down to TodoList
                                 * from TodoApp
                                 */
                            }
                            {/*<TodoList todos={filteredTodos} onToggle={this.handleToggle}/>*/}
                            <TodoList/>
                            <AddTodo onAddTodo={this.handleAddTodo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;