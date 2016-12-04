let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

// No longer works
// let Todo = require('Todo');
// Grab our raw (non-connected) react component
// let {Todo} = require('Todo');
import * as actions from 'actions';
import {Todo} from 'Todo';

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    // it('should dispatch TOGGLE_TODO action on click', () => {
    it('should dispatch UPDATE_TODO action on clicking checkbox', () => {
        let todoData = {
            id       : 9001,
            text     : 'Testing todo',
            completed: true
        };

        let action = actions.startToggleTodo(todoData.id, todoData.completed);

        let spy = expect.createSpy();
        let todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);
        let $el = $(ReactDOM.findDOMNode(todo));

        // Pass the div itself which is the root of the Todo component
        TestUtils.Simulate.click($el.find('input')[0]);

        // We're expecting the action object which includes the id
        // expect(spy).toHaveBeenCalledWith({
        //     type: 'TOGGLE_TODO',
        //     id  : todoData.id
        // });
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch UPDATE_TODO action on clicking todo', () => {

        let todoData = {
            id       : 12121,
            text     : 'keyboarding',
            completed: true
        };

        let action = actions.startToggleTodo(todoData.id, todoData.completed);

        let spy = expect.createSpy();
        let todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);
        let $el = $(ReactDOM.findDOMNode(todo));

        // Pass the div itself which is the root of the Todo component
        // console.log($el.find('.todo__subtext p'));
        TestUtils.Simulate.click($el.find('.todo__subtext p')[0]);
        expect(spy).toHaveBeenCalledWith(action);

        TestUtils.Simulate.click($el.find('.todo__subtext p')[1]);
        expect(spy).toHaveBeenCalledWith(action);
    });

    // No longer works
    // it('should call onToggle prop with id on a click', () => {
    //     let todoData = {
    //         id: 9001,
    //         text: 'Testing todo',
    //         completed: true
    //     };
    //
    //     let spy = expect.createSpy();
    //     let todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);
    //     let $el = $(ReactDOM.findDOMNode(todo));
    //
    //     // Pass the div itself which is the root of the Todo component
    //     TestUtils.Simulate.click($el[0]);
    //
    //     expect(spy).toHaveBeenCalledWith(todoData.id);
    // });
});