let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

// No longer works because we need the raw (non-connected)react component
// let TodoSearch = require('TodoSearch');
// Get the raw (non-connected) react component
let {TodoSearch} = require('TodoSearch');

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    it('should dispatch SET_SEARCH_TEXT on input change', () => {
        let searchText = 'Google';
        let action = {
            type: 'SET_SEARCH_TEXT',
            //ES6
            searchText
        };
        let spy = expect.createSpy();
        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

        todoSearch.refs.searchText.value = searchText;

        // Simulate the change event which means that are function is going to get called
        TestUtils.Simulate.change(todoSearch.refs.searchText);

        // false because the initial value of showCompleted is false
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
        let spy = expect.createSpy();
        let action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };

        let todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

        todoSearch.refs.showCompleted.checked = true;

        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(action);
    });

    // No longer works
    // it('should call onSearch with entered input text', () => {
    //     let searchText = 'Google';
    //     let spy = expect.createSpy();
    //     let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
    //
    //     todoSearch.refs.searchText.value = searchText;
    //
    //     // Simulate the change event which means that are function is going to get called
    //     TestUtils.Simulate.change(todoSearch.refs.searchText);
    //
    //     // false because the initial value of showCompleted is false
    //     expect(spy).toHaveBeenCalledWith(false, searchText);
    // });

    // No longer works
    // it('should call onSearch with proper check value', () => {
    //     let spy = expect.createSpy();
    //     let todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
    //
    //     todoSearch.refs.showCompleted.checked = true;
    //
    //     TestUtils.Simulate.change(todoSearch.refs.showCompleted);
    //
    //     expect(spy).toHaveBeenCalledWith(true, '');
    // });
});