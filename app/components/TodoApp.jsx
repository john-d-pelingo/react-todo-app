import React from 'react';
import * as Redux from 'react-redux';

// Connected react component versions
import TodoSearch from 'TodoSearch';
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';

import * as actions from 'actions';

// Export pure react component (non-connected component) version mainly for test purposes
export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogout(e) {
        e.preventDefault();
        let {dispatch} = this.props;
        dispatch(actions.startLogout());
    }

    render() {
        return (
            <div className="todo-app">
                <div className="page-actions">
                    <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
                </div>
                <h1 className="page-title">Todo App</h1>
                <div name="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoSearch />
                            <TodoList />
                            <AddTodo />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

// Data is passed down from the Provider in app.jsx
// Export connected react component version as default
export default TodoApp = Redux.connect()(TodoApp);