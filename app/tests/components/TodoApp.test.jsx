let React = require('react');
let ReactDOM = require('react-dom');
let {Provider} = require('react-redux');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

let configureStore = require('configureStore');

// Not gonna work because we have two exports now
// let TodoList = require('TodoList');
// The default one is the connected react component
// The other one is the raw (non-connected) react component
// import takes care that we get the default if no object destructuring is defined
import TodoList from 'TodoList';

let TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should render TodoList',() => {
        let store = configureStore.configure();
        let provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoApp/>
            </Provider>
        );

        // We're looking for instances for TodoApp and grab that first one that we find
        let todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        let todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

        expect(todoList.length).toEqual(1);
    });

    // No longer works
    // it('should add todo to the todos state on handleAddTodo', () => {
    //     let todoText = 'Must test!';
    //     let todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    //
    //     todoApp.setState({
    //         todos: []
    //     });
    //
    //     // Simulate the handleAddTodo function
    //     todoApp.handleAddTodo(todoText);
    //
    //     expect(todoApp.state.todos[0].text).toBe(todoText);
    //     // Expect createdAt to be a number
    //     expect(todoApp.state.todos[0].createdAt).toBeA('number');
    // });

    // No longer works
    // it('should toggle completed value when handleToggle called', () => {
    //     let todoData = {
    //         id         : 11,
    //         text       : 'Testing testing',
    //         completed  : false,
    //         createdAt  : 0,
    //         completedAt: undefined
    //     };
    //
    //     let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    //
    //     todoApp.setState({
    //         todos: [
    //             todoData
    //         ]
    //     });
    //
    //     // Check that todos first item has completed value of false
    //     expect(todoApp.state.todos[0].completed).toBe(false);
    //
    //     // Call and verify handleToggle to 11
    //     todoApp.handleToggle(todoData.id);
    //     expect(todoApp.state.todos[0].completed).toBe(true);
    //     // Expect completedAt to be a number
    //     expect(todoApp.state.todos[0].completedAt).toBeA('number');
    // });

    // No longer works
    // it('should remove completedAt when completed gets toggled from true to false', () => {
    //     let todoData = {
    //         id         : 11,
    //         text       : 'Testing testing',
    //         completed  : true,
    //         createdAt  : 0,
    //         completedAt: 9999
    //     };
    //
    //     let todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    //
    //     todoApp.setState({
    //         todos: [
    //             todoData
    //         ]
    //     });
    //
    //     // Check that todos first item has completed value of true
    //     expect(todoApp.state.todos[0].completed).toBe(true);
    //
    //     // Call and verify handleToggle to 11
    //     todoApp.handleToggle(todoData.id);
    //     expect(todoApp.state.todos[0].completed).toBe(false);
    //
    //     // Expect completedAt to be undefined
    //     expect(todoApp.state.todos[0].completedAt).toBeA('undefined');
    //     // or
    //     expect(todoApp.state.todos[0].completedAt).toNotExist();
    //
    // });
});