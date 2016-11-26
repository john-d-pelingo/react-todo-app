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
        // Expect createdAt to be a number
        expect(todoApp.state.todos[0].createdAt).toBeA('number');
    });

    it('should toggle completed value when handleToggle called', () => {
        let todoData = {
            id         : 11,
            text       : 'Testing testing',
            completed  : false,
            createdAt  : 0,
            completedAt: undefined
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
        // Expect completedAt to be a number
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });

    it('should remove completedAt when completed gets toggled from true to false', () => {
        let todoData = {
            id         : 11,
            text       : 'Testing testing',
            completed  : true,
            createdAt  : 0,
            completedAt: 9999
        };

        let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        todoApp.setState({
            todos: [
                todoData
            ]
        });

        // Check that todos first item has completed value of true
        expect(todoApp.state.todos[0].completed).toBe(true);

        // Call and verify handleToggle to 11
        todoApp.handleToggle(todoData.id);
        expect(todoApp.state.todos[0].completed).toBe(false);

        // Expect completedAt to be undefined
        expect(todoApp.state.todos[0].completedAt).toBeA('undefined');
        // or
        expect(todoApp.state.todos[0].completedAt).toNotExist();

    });
});