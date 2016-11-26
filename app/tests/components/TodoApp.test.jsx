let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

let TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should add todo to the todos state on handleAddTodo', () => {
        let todoText = 'Must test!';
        let todoApp = TestUtils.renderIntoDocument(<TodoApp />);

        todoApp.setState({
            todos: []
        });

        // Simulate the handleAddTodo function
        todoApp.handleAddTodo(todoText);

        expect(todoApp.state.todos[0].text).toBe(todoText);
    });

    it('should toggle completed value when handleToggle called', () => {
        let todoData = {
            id       : 11,
            text     : 'Testing testing',
            completed: false
        };

        let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        todoApp.setState({
            todos: [
                todoData
            ]
        });

        // Check that todos first item has completed value of false
        expect(todoApp.state.todos[0].completed).toBe(false);

        // Call and verify handleToggle to 11
        todoApp.handleToggle(todoData.id);
        expect(todoApp.state.todos[0].completed).toBe(true);
    });
});