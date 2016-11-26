let React = require('react');

let TodoList = require('TodoList');

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
    render         : function () {
        let {todos} = this.state;

        return (
            <TodoList todos={todos}/>
        );
    }
});

module.exports = TodoApp;