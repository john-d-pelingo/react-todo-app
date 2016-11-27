let React = require('react');

let Todo = require('Todo');

let TodoList = React.createClass({
    render: function () {
        let {todos} = this.props;

        let renderTodos = () => {
            // If there are no todos
            if (todos.length === 0) {
                return (
                    <p className="container__message">Nothing Todo</p>
                );
            }
            // When we are iterating over an array and we are generating multiple instances of our component
            // we have to give them a unique key prop
            // It is used internally by React to keep track of the individual components
            return todos.map((todo) => {
                {
                    /* {...todo} is object spread operator
                     */
                }
                return <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
            });
        };
        return (
            <div className="todo-list">
                {renderTodos()}
            </div>
        );
    }
});

module.exports = TodoList;