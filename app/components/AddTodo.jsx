import React from 'react';
// connect() is the companion to the Provider component which
// - lets our component access state properties
// - provides as the dispatch() method
import {connect} from 'react-redux';

import * as actions from 'actions';

// Export pure react component (non-connected component) version mainly for test purposes
export class AddTodo extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(e) {
        e.preventDefault();
        let {dispatch} = this.props;

        // Accessing object property with invalid characters
        let inputNewTodoText = this.refs['new-todo-text'];
        let strNewTodo = inputNewTodoText.value || '';

        if (strNewTodo.trim().length > 0) {
            inputNewTodoText.value = '';
            dispatch(actions.startAddTodo(strNewTodo));
        } else {
            inputNewTodoText.focus();
        }
    }

    render() {
        return (
            <div className="container__footer">
                <form onSubmit={this.onSubmit.bind(this)} ref="form">
                    <input type="text" ref="new-todo-text" placeholder="Add a new todo"/>
                    <button className="button">Add Todo</button>
                </form>
            </div>
        )
    }
};

// Data is passed down from the Provider in app.jsx
// Export connected react component version as default
export default connect()(AddTodo);