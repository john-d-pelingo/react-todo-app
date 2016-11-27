let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

let TodoList = require('TodoList');
let Todo = require('Todo');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        let todos = [
            {
                id  : 1,
                text: 'Dummy todo 1'
            },
            {
                id  : 2,
                text: 'Dummy to do 2'
            }
        ];
        let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

        // Store all of the todos components that are found in our todo list
        // Check how many of the given component are rendered under a separate component
        // First parameter is the item we wanna check
        // Second parameter is the class of the item that we wanna look for
        // We'll get an array of components
        let todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        let todos = [];
        let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        let $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});