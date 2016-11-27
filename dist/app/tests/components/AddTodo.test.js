'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
// Makes tests for React components easier
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo', function () {
        it('should exist', function () {
                expect(AddTodo).toExist();
        });

        it('should call onAddTodo if valid text entered', function () {
                var strTodoToAdd = 'Plaaaay';

                var spy = expect.createSpy();
                var addTodo = TestUtils.renderIntoDocument(React.createElement(AddTodo, { onAddTodo: spy }));
                var $el = $(ReactDOM.findDOMNode(addTodo));

                addTodo.refs['new-todo-text'].value = strTodoToAdd;

                // Activate the form submit or simulate the submit event
                TestUtils.Simulate.submit($el.find('form')[0]);

                expect(spy).toHaveBeenCalledWith(strTodoToAdd);
        });

        it('should call onAddTodo if invalid text entered', function () {
                var strTodoToAdd = '';

                var spy = expect.createSpy();
                var addTodo = TestUtils.renderIntoDocument(React.createElement(AddTodo, { onAddTodo: spy }));
                var $el = $(ReactDOM.findDOMNode(addTodo));

                addTodo.refs['new-todo-text'].value = strTodoToAdd;

                // Activate the form submit
                TestUtils.Simulate.submit($el.find('form')[0]);

                expect(spy).toNotHaveBeenCalled();
        });
});
//# sourceMappingURL=AddTodo.test.js.map