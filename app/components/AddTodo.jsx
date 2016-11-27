let React = require('react');
let {connect} = require('react-redux');
let actions = require('actions');

// Export this pure react component (non-connected component) for test purposes
// Export non-connected react component version
export let AddTodo = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        let {dispatch} = this.props;

        // Accessing object property with invalid characters
        let inputNewTodoText = this.refs['new-todo-text'];
        let strNewTodo = inputNewTodoText.value || '';

        if (strNewTodo.trim().length > 0) {
            inputNewTodoText.value = '';
            // This prop is no longer gets passed down
            // this.props.onAddTodo(strNewTodo.trim());
            // Instead we use the dispatch function provided by the store
            // and pass the action addTodo()
            dispatch(actions.addTodo(strNewTodo));
        } else {
            inputNewTodoText.focus();
        }
    },
    render  : function () {
        return (
            <div className="container__footer">
                <form onSubmit={this.onSubmit} ref="form">
                    <input type="text" ref="new-todo-text" placeholder="Add a new todo"/>
                    <button className="button">Add Todo</button>
                </form>
            </div>
        )
    }
});

// We already have the dispatch() function which is provided by the store
// and we don't need data since it is passed down from the Provider in app.jsx
// This will be the default export and we can use import to get it
// Export the connected react component version
export default connect()(AddTodo);


// module.exports = AddTodo;