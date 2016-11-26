let React = require('react');

let AddTodo = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();

        // Accessing object property with invalid characters
        let inputNewTodoText = this.refs['new-todo-text'];
        let strNewTodo = inputNewTodoText.value || '';

        if (strNewTodo.trim().length > 0) {
            inputNewTodoText.value = '';
            this.props.onAddTodo(strNewTodo.trim());
        } else {
            inputNewTodoText.focus();
        }
    },
    render  : function () {
        return (
            <div className="add-todo">
                <form onSubmit={this.onSubmit} ref="form">
                    <input type="text" ref="new-todo-text" placeholder="Add a new todo"/>
                    <button className="button">Add Todo</button>
                </form>
            </div>
        )
    }
});

module.exports = AddTodo;