let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

// No longer works because we need the raw (non-connected)react component
// let AddTodo = require('AddTodo');
// Get the raw (non-connected) react component
let {AddTodo} = require('AddTodo');


describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should dispatch ADD_TODO when valid todo text', () => {
        let strTodoToAdd = 'Plaaaay';
        let action = {
            type: 'ADD_TODO',
            text: strTodoToAdd
        };

        let spy = expect.createSpy();
        let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        let $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs['new-todo-text'].value = strTodoToAdd;

        // Activate the form submit or simulate the submit event
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should not dispatch ADD_TODO when invalid todo text', () => {
        let strTodoToAdd = '';

        let spy = expect.createSpy();
        let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
        let $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs['new-todo-text'].value = strTodoToAdd;

        // Activate the form submit
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });

    // No longer works
    // it('should call onAddTodo if valid text entered', () => {
    //     let strTodoToAdd = 'Plaaaay';
    //
    //     let spy = expect.createSpy();
    //     let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
    //     let $el = $(ReactDOM.findDOMNode(addTodo));
    //
    //     addTodo.refs['new-todo-text'].value = strTodoToAdd;
    //
    //     // Activate the form submit or simulate the submit event
    //     TestUtils.Simulate.submit($el.find('form')[0]);
    //
    //     expect(spy).toHaveBeenCalledWith(strTodoToAdd);
    // });

    // No longer works
    // it('should call onAddTodo if invalid text entered', () => {
    //     let strTodoToAdd = '';
    //
    //     let spy = expect.createSpy();
    //     let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
    //     let $el = $(ReactDOM.findDOMNode(addTodo));
    //
    //     addTodo.refs['new-todo-text'].value = strTodoToAdd;
    //
    //     // Activate the form submit
    //     TestUtils.Simulate.submit($el.find('form')[0]);
    //
    //     expect(spy).toNotHaveBeenCalled();
    // });
});