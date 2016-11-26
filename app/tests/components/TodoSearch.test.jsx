let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

let TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    })

    it('should call onSearch with entered input text', () => {
        let searchText = 'Google';
        let spy = expect.createSpy();
        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        let $el = $(ReactDOM.findDOMNode(todoSearch));

        todoSearch.refs.searchText.value = searchText;

        // Simulate the change event which means that are function is going to get called
        TestUtils.Simulate.change(todoSearch.refs.searchText);

        // false because the initial value of showCompleted is false
        expect(spy).toHaveBeenCalledWith(false, searchText);
    });

    it('should call onSearch with proper check value', () => {
        let spy = expect.createSpy();
        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

        todoSearch.refs.showCompleted.checked = true;

        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(true, '');
    });
});