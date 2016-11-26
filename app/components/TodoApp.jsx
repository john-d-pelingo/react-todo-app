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
                    id  : uuid(),
                    text: 'Play with the cat'
                },
                {
                    id  : uuid(),
                    text: 'Clean the room'
                },
                {
                    id  : uuid(),
                    text: 'Study!!!'
                },
                {
                    id  : uuid(),
                    text: 'Eat something'
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
                    id: uuid(),
                    text: text
                }
            ]
        })
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
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;