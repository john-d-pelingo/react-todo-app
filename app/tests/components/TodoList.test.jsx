let React = require('react');
let ReactDOM = require('react-dom');
let {Provider} = require('react-redux');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

import {configure} from 'configureStore';

// No longer works
// let TodoList = require('TodoList');
// ConnectedTodoList: The component that is connected to the redux store
// {TodoList}: The raw (non-connected) react component
import ConnectedTodoList, {TodoList} from 'TodoList'
// No longer works
// let Todo = require('Todo');
// ConnectedTodo: The component that is connected to the redux store
// {Todo}: The raw (non-connected) react component
import ConnectedTodo, {Todo} from 'Todo'

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        let todos = [
            {
                id         : 1,
                text       : 'Dummy todo 1',
                completed  : false,
                completedAt: undefined,
                createdAt  : 199999
            },
            {
                id         : 2,
                text       : 'Dummy to do 2',
                completed  : false,
                completedAt: undefined,
                createdAt  : -199999
            }
        ];
        let store = configure({
            // ES5
            // todos: todos
            // ES6
            todos
        });
        let provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                {/* No need to pass any properties since it's gonna get the data from the store
                 * which we passed into the provider
                 */}
                <ConnectedTodoList/>
            </Provider>
        );
        let todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];

        // Store all of the todos components that are found in our todo list
        // Check how many of the given component are rendered under a separate component
        // First parameter is the item we wanna check
        // Second parameter is the class of the item that we wanna look for
        // We'll get an array of components
        let todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        let todos = [];
        let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        let $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });

    // No longer works
    // it('should render one Todo component for each todo item', () => {
    //     let todos = [
    //         {
    //             id  : 1,
    //             text: 'Dummy todo 1'
    //         },
    //         {
    //             id  : 2,
    //             text: 'Dummy to do 2'
    //         }
    //     ];
    //     let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    //
    //     // Store all of the todos components that are found in our todo list
    //     // Check how many of the given component are rendered under a separate component
    //     // First parameter is the item we wanna check
    //     // Second parameter is the class of the item that we wanna look for
    //     // We'll get an array of components
    //     let todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
    //
    //     expect(todosComponents.length).toBe(todos.length);
    // });
});