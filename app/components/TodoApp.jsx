let React = require('react');

let TodoList = require('TodoList');
let AddTodo = require('AddTodo');

let TodoApp = React.createClass({
    getInitialState: function () {
        return {
            todos: [
                {
                    id  : 1,
                    text: 'Play with the cat'
                },
                {
                    id  : 2,
                    text: 'Clean the room'
                },
                {
                    id  : 3,
                    text: 'Study!!!'
                },
                {
                    id  : 4,
                    text: 'Eat something'
                }
            ]
        };
    },
    handleAddTodo: function (text) {
      alert('new todo: ' + text);
    },
    render         : function () {
        let {todos} = this.state;

        return (
            <div className="todo-app">
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
});

module.exports = TodoApp;