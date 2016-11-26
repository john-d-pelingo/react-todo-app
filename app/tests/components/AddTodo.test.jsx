let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

let AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call onAddTodo if valid text entered', () => {
        let strTodoToAdd = 'Plaaaay';

        let spy = expect.createSpy();
        let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        let $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs['new-todo-text'].value = strTodoToAdd;

        // Activate the form submit or simulate the submit event
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(strTodoToAdd);
    });

    it('should call onAddTodo if invalid text entered', () => {
        let strTodoToAdd = '';

        let spy = expect.createSpy();
        let addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        let $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs['new-todo-text'].value = strTodoToAdd;

        // Activate the form submit
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});