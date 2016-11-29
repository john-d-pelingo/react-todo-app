let React = require('react');
// connect() is the companion to the Provider component which lets our component access state properties,
// as well as the dispatch method
// The children need to specify which data they like from the Provider
let {connect} = require('react-redux');
let moment = require('moment');

// Our actions
let actions = require('actions');

// Export this pure react component (non-connected component) for test purposes
// Export non-connected react component version
export let Todo = React.createClass({
    render: function () {
        let {id, text, completed, createdAt, completedAt, dispatch} = this.props;
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
                {/*This prop is no longer gets passed down*/}
                {/*this.props.onToggle(id);*/}
                {/* Instead we use the dispatch function provided by the store
                  * and pass the action toggleTodo()
                  */}
                {/*dispatch(actions.toggleTodo(id));*/}
                dispatch(actions.startToggleTodo(id, !completed));

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

// Todo doesn't need the data because it's gonna come from the TodoList component
// Todo needs access to dispatch and by calling connect we already have access to it
// and it's gonna be available on our props
// This will be the default export and we can use import to get it
// Export the connected react component version
export default connect()(Todo);

// Todo doesn't need the data because it's gonna come from the TodoList component
// Todo needs access to dispatch and by calling connect we already have access to it
// and it's gonna be available on our props
// module.exports = connect()(Todo);