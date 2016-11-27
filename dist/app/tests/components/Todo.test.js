'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
// Makes tests for React components easier
var TestUtils = require('react-addons-test-utils');

var Todo = require('Todo');

describe('Todo', function () {
    it('should exist', function () {
        expect(Todo).toExist();
    });

    it('should call onToggle prop with id on a click', function () {
        var todoData = {
            id: 9001,
            text: 'Testing todo',
            completed: true
        };

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(React.createElement(Todo, _extends({}, todoData, { onToggle: spy })));
        var $el = $(ReactDOM.findDOMNode(todo));

        // Pass the div itself which is the root of the Todo component
        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(todoData.id);
    });
});
//# sourceMappingURL=Todo.test.js.map