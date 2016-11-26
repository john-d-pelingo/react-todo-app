let React = require('react');
let ReactDOM = require('react-dom');
let expect = require('expect');
let $ = require('jQuery');
// Makes tests for React components easier
let TestUtils = require('react-addons-test-utils');

let Todo = require('Todo');

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });
});