import React from 'react';
// connect() is the companion to the Provider component which
// - lets our component access state properties
// - provides as the dispatch() method
import {connect} from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

// Export pure react component (non-connected component) version mainly for test purposes
export class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onTodoClick(e) {
        e.preventDefault();
        let {id, completed, dispatch} = this.props;
        dispatch(actions.startToggleTodo(id, !completed));
    }

    onCheckBoxClick(e) {
        e.preventDefault();
    }

    onDeleteClick() {
        let {id, dispatch} = this.props;
        dispatch(actions.startDeleteTodo(id));
    }

    render() {
        let {text, completed, createdAt, completedAt} = this.props;
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
            <div className={todoClassName}>
                <div>
                    <input type="checkbox" checked={completed} onClick={this.onTodoClick.bind(this)} onChange={this.onCheckBoxClick.bind(this)}/>
                </div>
                <div className="todo__subtext" onClick={this.onTodoClick.bind(this)}>
                    <p>{text}</p>
                    <p>{renderDate()}</p>
                </div>
                <button className="button alert" onClick={this.onDeleteClick}>Delete</button>
            </div>
        );
    }
}

// Data is passed down from the Provider in app.jsx
// but {text, completed, createdAt, completedAt} is passed down
// from the connected react component TodoList.jsx
// Export connected react component version as default
export default connect()(Todo);