let expect = require('expect');

let TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    // Clean the localStorage value
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    // No longer needed
    // describe('setTodos', () => {
    //     it('should set valid todos array', () => {
    //         let todos = [
    //             {
    //                 id       : 1992,
    //                 text     : 'Set birth year',
    //                 completed: false
    //             }
    //         ];
    //
    //         TodoAPI.setTodos(todos);
    //         let actualTodos = JSON.parse(localStorage.getItem('todos'));
    //
    //         // toBe() checks if they are the same exact object or array in memory
    //         // toEqual() just compares the value on them
    //         // toEqual() is better for objects or arrays to check each value
    //         expect(actualTodos).toEqual(todos);
    //     });
    //
    //     it('should not set invalid todos array', () => {
    //         let badTodos = {
    //             x: 22,
    //             y: 'sss',
    //             z: function () {
    //                 return 2;
    //             }
    //         };
    //
    //         TodoAPI.setTodos(badTodos);
    //
    //         expect(localStorage.getItem('todos')).toBe(null);
    //     });
    // });
    //
    // describe('getTodos', () => {
    //     it('should return empty array for bad localStorage data', () => {
    //         // We cleaned up the localStorage value in the beginning
    //         let actualTodos = TodoAPI.getTodos();
    //         // toBe() would fail because 2 arrays are different references to the memory
    //         expect(actualTodos).toEqual([]);
    //     });
    //
    //     it('should return todo if valid array in localStorage', () => {
    //         let todos = [
    //             {
    //                 id       : 1992,
    //                 text     : 'Set birth year',
    //                 completed: false
    //             }
    //         ];
    //
    //         // It's good to not use other functions implemented in the same object
    //         localStorage.setItem('todos', JSON.stringify(todos));
    //         let actualTodos = TodoAPI.getTodos();
    //
    //         expect(actualTodos).toEqual(todos);
    //     });
    // });

    describe('filterTodos', () => {
        let todos = [
            {
                id       : 1,
                text     : 'Eat apple',
                completed: true
            },
            {
                id       : 44,
                text     : 'Go apple !!!',
                completed: false
            },
            {
                id       : 2212,
                text     : 'SHAYMAN',
                completed: true
            }
        ];

        it('should return all todos if showCompleted is true', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return non-completed todos when showCompleted is false', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort todos by completed status', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should return all todos if searchText is empty', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should filter todos by searchText \'aPpLe\'', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, true, 'aPpLe');
            expect(filteredTodos.length).toBe(2);
        });

        it('should filter todos by searchText if uppercase', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, true, 'EAT');
            expect(filteredTodos.length).toBe(1);
        });

        it('should filter todos by searchText if lowercase', () => {
            let filteredTodos = TodoAPI.filterTodos(todos, true, 'shayman');
            expect(filteredTodos.length).toBe(1);
        });
    });
});
