'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
// Makes tests for React components easier
var TestUtils = require('react-addons-test-utils');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', function () {
    it('should exist', function () {
        expect(TodoSearch).toExist();
    });

    it('should call onSearch with entered input text', function () {
        var searchText = 'Google';
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(React.createElement(TodoSearch, { onSearch: spy }));

        todoSearch.refs.searchText.value = searchText;

        // Simulate the change event which means that are function is going to get called
        TestUtils.Simulate.change(todoSearch.refs.searchText);

        // false because the initial value of showCompleted is false
        expect(spy).toHaveBeenCalledWith(false, searchText);
    });

    it('should call onSearch with proper check value', function () {
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(React.createElement(TodoSearch, { onSearch: spy }));

        todoSearch.refs.showCompleted.checked = true;

        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(true, '');
    });
});
//# sourceMappingURL=TodoSearch.test.js.map