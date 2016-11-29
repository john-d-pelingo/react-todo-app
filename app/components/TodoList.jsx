let React = require('react');
// connect() is the companion to the Provider component which lets our component access state properties,
// as well as the dispatch method
// The children need to specify which data they like from the Provider
let {connect} = require('react-redux');

// Doesn't filter the list based on completed value of search text therefore we use this
let TodoAPI = require('TodoAPI');

// Not gonna work because the default export is the pure react version (non-connected) and we want the connected one
// let Todo = require('Todo');
// import takes care that we get the default if no object destructuring is defined
import Todo from 'Todo';

// Export this pure react component (non-connected component) for test purposes
// Export non-connected react component version
export let TodoList = React.createClass({
    render: function () {
        let {todos, showCompleted, searchText} = this.props;

        let renderTodos = () => {
            let filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
            // If there are no todos
            // We need to get the length of the filtered todos because it doesn't matter if there are todos as they
            // might not get shown the screen because they might not have passed the filters test
            // if (todos.length === 0) {
            if (filteredTodos.length === 0) {
                return (
                    <p className="container__message">Nothing Todo</p>
                );
            }
            // When we are iterating over an array and we are generating multiple instances of our component
            // we have to give them a unique key prop
            // It is used internally by React to keep track of the individual components
            // return todos.map((todo) => {
            // Instead of mapping directly over the todos array we're gonna first call TodoAPI
            // Now this component is gonna properly fetch the todos array
            // related to the showCompleted and searchText value
            return filteredTodos.map((todo) => {
                {
                    /* {...todo} is object spread operator
                     */
                }
                // The handler is no longer required
                // return <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
                return <Todo key={todo.id} {...todo}/>
            });
        };
        return (
            <div className="todo-list">
                {renderTodos()}
            </div>
        );
    }
});

// We pass the TodoList component that we like to connect to the Provider
// In other words we wanna do a connection and we wanna connect it to TodoList
// Which means the TodoList component can now request data that it would like in order to render itself
// In this case all we need is the todos array
// This will be the default export and we can use import to get it
// Export the connected react component version
export default connect(
    // Which pieces of state our component wants
    // The state has the complete state
    (state) => {
        // The property todos is gonna get set on the props for our component TodoList
        // And our TodoList component is gonna have access to whatever the state.todos property is
        // which is an array of todo items
        // return {
        //     todos: state.todos,
        // };

        // We want all three properties of our redux store
        return state;
    }
)(TodoList);