'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
// Makes tests for React components easier
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', function () {
    it('should exist', function () {
        expect(TodoApp).toExist();
    });

    it('should add todo to the todos state on handleAddTodo', function () {
        var todoText = 'Must test!';
        var todoApp = TestUtils.renderIntoDocument(React.createElement(TodoApp, null));

        todoApp.setState({
            todos: []
        });

        // Simulate the handleAddTodo function
        todoApp.handleAddTodo(todoText);

        expect(todoApp.state.todos[0].text).toBe(todoText);
        // Expect createdAt to be a number
        expect(todoApp.state.todos[0].createdAt).toBeA('number');
    });

    it('should toggle completed value when handleToggle called', function () {
        var todoData = {
            id: 11,
            text: 'Testing testing',
            completed: false,
            createdAt: 0,
            completedAt: undefined
        };

        var todoApp = TestUtils.renderIntoDocument(React.createElement(TodoApp, null));

        todoApp.setState({
            todos: [todoData]
        });

        // Check that todos first item has completed value of false
        expect(todoApp.state.todos[0].completed).toBe(false);

        // Call and verify handleToggle to 11
        todoApp.handleToggle(todoData.id);
        expect(todoApp.state.todos[0].completed).toBe(true);
        // Expect completedAt to be a number
        expect(todoApp.state.todos[0].completedAt).toBeA('number');
    });

    it('should remove completedAt when completed gets toggled from true to false', function () {
        var todoData = {
            id: 11,
            text: 'Testing testing',
            completed: true,
            createdAt: 0,
            completedAt: 9999
        };

        var todoApp = TestUtils.renderIntoDocument(React.createElement(TodoApp, null));

        todoApp.setState({
            todos: [todoData]
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
//# sourceMappingURL=TodoApp.test.js.map