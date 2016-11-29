let expect = require('expect');
import configureMockStore from 'redux-mock-store';
// for the mock store
import thunk from 'redux-thunk';

let actions = require('actions');

// Generator to generate as many distinct stores as we like
let createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate search text action', () => {
        let action = {
            type      : 'SET_SEARCH_TEXT',
            searchText: 'A search text'
        };

        let res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('should generate add todo action', () => {
        let action = {
            type: 'ADD_TODO',
            // After implementing startAddTodo() in the actions a string is no longer passed through
            // Instead a todo object is passed
            // text: 'Must do this to do'
            todo: {
                id       : 'aaaa',
                text     : 'a teeeext',
                completed: false,
                createdAt: 12312
            }
        };

        let res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    // Asynchronous test since we sue firebase
    it('should create todo and dispatch ADD_TODO but occasionally fails because Google firebase is a bit slow', (done) => {
        const STORE = createMockStore({});
        const TODO_TEXT = 'A todo iteeeeem';

        // Returns a promise
        STORE.dispatch(actions.startAddTodo(TODO_TEXT)).then(
            () => {
                // Success

                // Returns an array of all of the actions that were fired on our mock store
                // toInclude() is similar to toEqual()
                const ACTIONS = STORE.getActions();

                expect(ACTIONS[0]).toInclude({
                    type: 'ADD_TODO'
                });

                expect(ACTIONS[0].todo).toInclude({
                    text: TODO_TEXT
                });

                // Wrap up our tests
                done();

                // If things go bad we end the test
            }).catch(done);
    });

    it('should generate add todos action object', () => {
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

        let res = actions.addTodos(todos);

        expect(res).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        let action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };

        let res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it('should generate toggle todo action', () => {
        let action = {
            type: 'TOGGLE_TODO',
            id  : '42'
        };

        let res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    });
});