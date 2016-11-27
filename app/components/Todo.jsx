let React = require('react');
let moment = require('moment');

let Todo = React.createClass({
    render: function () {
        let {id, text, completed, createdAt, completedAt} = this.props;
        let todoClassName = completed ? 'todo todo-completed' : 'todo';
        let renderDate = () => {
            let message = 'Created at ';
            let timestamp = createdAt;

            if (completed) {
                message = 'Completed at ';
                timestamp = completedAt;
            }

            return message + moment.unix(timestamp).format('MMMM Do, YYYY @hh:mm A');
        };

        return (
            <div className={todoClassName} onClick={() => {
                this.props.onToggle(id);
            }}>
                {
                    /* Show warning without onChange handler, so I just return
                     */
                }
                <div>
                    <input type="checkbox" checked={completed} onChange={() => {
                    }}/>
                </div>
                <div className="todo__subtext">
                    <p>{text}</p>
                    <p>{renderDate()}</p>
                </div>
            </div>
        );
    }
});

module.exports = Todo;