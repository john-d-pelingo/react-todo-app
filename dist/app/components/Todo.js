'use strict';

var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
    displayName: 'Todo',

    render: function render() {
        var _this = this;

        var _props = this.props,
            id = _props.id,
            text = _props.text,
            completed = _props.completed,
            createdAt = _props.createdAt,
            completedAt = _props.completedAt;

        var todoClassName = completed ? 'todo todo-completed' : 'todo';
        var renderDate = function renderDate() {
            var message = 'Created at ';
            var timestamp = createdAt;

            if (completed) {
                message = 'Completed at ';
                timestamp = completedAt;
            }

            return message + moment.unix(timestamp).format('MMMM Do, YYYY @hh:mm A');
        };

        return React.createElement(
            'div',
            { className: todoClassName, onClick: function onClick() {
                    _this.props.onToggle(id);
                } },
            React.createElement(
                'div',
                null,
                React.createElement('input', { type: 'checkbox', checked: completed, onChange: function onChange() {} })
            ),
            React.createElement(
                'div',
                { className: 'todo__subtext' },
                React.createElement(
                    'p',
                    null,
                    text
                ),
                React.createElement(
                    'p',
                    null,
                    renderDate()
                )
            )
        );
    }
});

module.exports = Todo;
//# sourceMappingURL=Todo.js.map