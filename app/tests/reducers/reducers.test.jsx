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
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle showCompleted', () => {
            // It's best to not use components that should be tested
            let action = {
                type: 'TOGGLE_SHOW_COMPLETED',
            };

            let res = reducers.showCompletedReducer(df(true), df(action));

            expect(res).toBe(false);
        });
    });

    describe('todosReducer', () => {
        it('should add new todo', () => {
            // It's best to not use components that should be tested
            let action = {
                type: 'ADD_TODO',
                // After implementing startAddTodo() in the actions a string is no longer passed through
                // Instead a todo object is passed
                // text: 'Must love JS',
                todo: {
                    id       : '123456',
                    text     : ' Something to do',
                    completed: false,
                    createdAt: 98989
                }
            };

            let res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        // it('should toggle todo', () => {
        it('should update todo', () => {
            let todos = [{
                id         : '89',
                text       : 'hueheuhueue',
                completed  : true,
                createdAt  : -99999,
                completedAt: -666
            }];

            let updates = {
                completed  : false,
                completedAt: null
            };

            let action = {
                // type: 'TOGGLE_TODO',
                type: 'UPDATE_TODO',
                id  : todos[0].id,
                updates
            };

            let res = reducers.todosReducer(df(todos), df(action));

            // expect(res[0].completed).toBe(false);
            // expect(res[0].completedAt).toNotExist();

            expect(res[0].completed).toBe(updates.completed);
            expect(res[0].completedAt).toBe(updates.completedAt);
            // Expect the text property to stay the same
            expect(res[0].text).toBe(todos[0].text);
        });

        it('should add existing todos', () => {
            let todos = [
                {
                    id         : '79',
                    text       : 'U WOT',
                    completed  : false,
                    completedAt: undefined,
                    createdAt  : 333333
                },
                {
                    id         : '7222',
                    text       : 'U???',
                    completed  : false,
                    completedAt: undefined,
                    createdAt  : 3233333
                }
            ];
            let action = {
                type: 'ADD_TODOS',
                todos
            };

            let res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toBe(2);
            expect(res[0]).toEqual(todos[0]);
        });
    });

});