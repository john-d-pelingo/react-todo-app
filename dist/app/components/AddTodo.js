'use strict';

var React = require('react');

var AddTodo = React.createClass({
    displayName: 'AddTodo',

    onSubmit: function onSubmit(e) {
        e.preventDefault();

        // Accessing object property with invalid characters
        var inputNewTodoText = this.refs['new-todo-text'];
        var strNewTodo = inputNewTodoText.value || '';

        if (strNewTodo.trim().length > 0) {
            inputNewTodoText.value = '';
            this.props.onAddTodo(strNewTodo.trim());
        } else {
            inputNewTodoText.focus();
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'container__footer' },
            React.createElement(
                'form',
                { onSubmit: this.onSubmit, ref: 'form' },
                React.createElement('input', { type: 'text', ref: 'new-todo-text', placeholder: 'Add a new todo' }),
                React.createElement(
                    'button',
                    { className: 'button' },
                    'Add Todo'
                )
            )
        );
    }
});

module.exports = AddTodo;
//# sourceMappingURL=AddTodo.js.map