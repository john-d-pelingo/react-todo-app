import React from 'react';
// connect() is the companion to the Provider component which
// - lets our component access state properties
// - provides as the dispatch() method
import  {connect} from 'react-redux';

// API to filter todos
import TodoAPI from 'TodoAPI';

// Connected react component versions
import Todo from 'Todo';

// Export pure react component (non-connected component) version mainly for test purposes
export class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {todos, showCompleted, searchText} = this.props;

        let renderTodos = () => {
            // Filter the todos based on:
            // - completed status
            // - current search text value
            let filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

            if (filteredTodos.length === 0) {
                return (
                    <p className="container__message">Nothing Todo</p>
                );
            }

            // When we are iterating over an array and we are generating multiple instances of our component
            // we have to give them a unique key prop
            // It is used internally by React to keep track of the individual components
            return filteredTodos.map((todo) => {
                return <Todo key={todo.id} {...todo}/>
            });
        };

        return (
            <div className="todo-list">
                {renderTodos()}
            </div>
        );
    }
};

// Data is passed down from the Provider in app.jsx
// Export connected react component version as default
export default connect(
    // Which pieces of state our component wants from the redux store
    (state) => {
        // We want all three properties from our redux store
        // which are {todos, showCompleted, searchText}
        return state;
    }
)(TodoList);