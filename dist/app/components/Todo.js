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
            { className: 'todo', onClick: function onClick() {
                    _this.props.onToggle(id);
                } },
            React.createElement('input', { type: 'checkbox', checked: completed, onChange: function onChange() {} }),
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
        );
    }
});

module.exports = Todo;
//# sourceMappingURL=Todo.js.map