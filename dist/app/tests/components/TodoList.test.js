'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
// Makes tests for React components easier
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', function () {
    it('should exist', function () {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', function () {
        var todos = [{
            id: 1,
            text: 'Dummy todo 1'
        }, {
            id: 2,
            text: 'Dummy to do 2'
        }];
        var todoList = TestUtils.renderIntoDocument(React.createElement(TodoList, { todos: todos }));

        // Store all of the todos components that are found in our todo list
        // Check how many of the given component are rendered under a separate component
        // First parameter is the item we wanna check
        // Second parameter is the class of the item that we wanna look for
        // We'll get an array of components
        var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', function () {
        var todos = [];
        var todoList = TestUtils.renderIntoDocument(React.createElement(TodoList, { todos: todos }));
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});
//# sourceMappingURL=TodoList.test.js.map