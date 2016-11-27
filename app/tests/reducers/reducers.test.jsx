let expect = require('expect');
// Ensure that the arguments passed to the reducers are not changed/updated
// If they are updated then the tests should fail
// This module is a fork of deep-freeze with the difference that it runs in strict mode
let df = require('deep-freeze-strict');

let reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            // Its' best to not use components that should be tested
            let action = {
                type      : 'SET_SEARCH_TEXT',
                searchText: 'cat'
            };

            let res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        })
    });

    describe('showCompletedReducer', () => {
        it('should toggle showCompleted', () => {
            // It's best to not use components that should be tested
            let action = {
                type      : 'TOGGLE_SHOW_COMPLETED',
            };

            let res = reducers.showCompletedReducer(df(true), df(action));

            expect(res).toBe(false);
        })
    });

});