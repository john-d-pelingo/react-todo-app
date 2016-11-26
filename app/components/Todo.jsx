let React = require('react');
let moment = require('moment');

let Todo = React.createClass({
    render: function () {
        let {id, text, completed, createdAt, completedAt} = this.props;
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
            <div className="todo" onClick={() => {
                this.props.onToggle(id);
            }}>
                {
                    /* Show warning without onChange handler, so I just return
                     */
                }
                <input type="checkbox" checked={completed} onChange={() => {
                }}/>
                <p>{text}</p>
                <p>{renderDate()}</p>
            </div>
        );
    }
});

module.exports = Todo;