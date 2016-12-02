let expect = require('expect');
import configureMockStore from 'redux-mock-store';
// for the mock store
import thunk from 'redux-thunk';

import firebase, {firebaseRef} from 'app/firebase';
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

    // it('should generate toggle todo action', () => {
    it('should generate update todo action', () => {
        let action = {
            // type: 'TOGGLE_TODO',
            type   : 'UPDATE_TODO',
            id     : '42',
            updates: {
                completed: false
            }
        };

        // let res = actions.toggleTodo(action.id);
        let res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });

    it('should generate login action object', () => {
        const ACTION = {
            type: 'LOGIN',
            uid : '09990'
        };

        const RES = actions.login(ACTION.uid);

        expect(RES).toEqual(ACTION);
    });

    it('should generate logout action object', () => {
        const ACTION = {
            type: 'LOGOUT',
        };

        const RES = actions.logout();

        expect(RES).toEqual(ACTION);
    });

    // Need existing data for these to wotk
    describe('Tests with firebase todos', () => {
        let testTodoRef;
        // Store uid for logged in user;
        let uid;
        let todosRef;

        // From mocha and let's us define some code to run before every single test
        // Asynchronous
        // Create a todo item for test purposes
        beforeEach((done) => {
            // Sign in anonymously
            firebase.auth().signInAnonymously().then((user) => {
                uid = user.uid;
                todosRef = firebaseRef.child(`users/${uid}/todos`);

                // Remove existing todos
                return todosRef.remove();
            }).then(() => {
                testTodoRef = todosRef.push();

                return testTodoRef
                    .set({
                        text     : 'Something to do',
                        completed: false,
                        createdAt: 23123
                    });
            })
                .then(() => done())
                .catch(done);
        });

        //     let todosRef = firebaseRef.child('todos');
        //     // Completely wipe all the todo items
        //     todosRef
        //         .remove()
        //         .then(() => {
        //             // We use push() to generate that reference
        //             testTodoRef = firebaseRef.child('todos').push();
        //
        //             // Continue the promise chain
        //             return testTodoRef
        //                 .set({
        //                     text     : 'Something to do',
        //                     completed: false,
        //                     createdAt: 23123
        //                 });
        //         })
        //         .then(() => done())
        //         .catch(done);
        // });

        // From mocha and let's us define some code to run after every single test
        // Asynchronous
        // Remove generated todo item for test purposes
        afterEach((done) => {
            // testTodoRef
            //     .remove()
            //     // Success
            //     .then(() => done());
            // Wipe out the entire todos instead of one by one
            // Success
            todosRef.remove().then(() => done());

        });

        // Asynchronous test
        it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
            const STORE = createMockStore({
                // Now we need uid
                auth: {
                    uid
                }
            });
            // Was originally false above
            const ACTION = actions.startToggleTodo(testTodoRef.key, true);

            STORE.dispatch(ACTION).then(() => {
                    // Grab all mocked actions off of our store
                    const MOCK_ACTIONS = STORE.getActions();

                    expect(MOCK_ACTIONS[0]).toInclude({
                        type: 'UPDATE_TODO',
                        id  : testTodoRef.key
                    });
                    expect(MOCK_ACTIONS[0].updates).toInclude({
                        // Can't get the completedAt key-value pair because it's always different
                        completed: true
                    });
                    expect(MOCK_ACTIONS[0].updates.completedAt).toExist();

                    done();
                },
                // Fail
                done);
        });

        it('should populate todos and dispatch ADD_TODOS action', (done) => {
            const STORE = createMockStore({
                // Now we need uid
                auth: {
                    uid
                }
            });
            const ACTION = actions.startAddTodos();

            STORE.dispatch(ACTION).then(() => {
                const MOCK_ACTIONS = STORE.getActions();
                // console.log(MOCK_ACTIONS);
                expect(MOCK_ACTIONS[0].type).toEqual('ADD_TODOS');
                expect(MOCK_ACTIONS[0].todos.length).toBe(1);
                expect(MOCK_ACTIONS[0].todos[0].text).toEqual('Something to do');
                done();
            }, done);
        });

        // Asynchronous test since we use firebase
        it('should create todo and dispatch ADD_TODO but occasionally fails because Google firebase is a bit slow', (done) => {
            const STORE = createMockStore({
                // Now we need uid
                auth: {
                    uid
                }
            });
            const TODO_TEXT = 'A todo iteeeeem';

            // Returns a promise
            STORE.dispatch(actions.startAddTodo(TODO_TEXT)).then(() => {
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
    });
});