let expect = require('expect');

let actions = require('actions');

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
            text: 'Must do this to do'
        };

        let res = actions.addTodo(action.text);

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

    it('should generate toggle todo action', () => {
        let action = {
            type: 'TOGGLE_TODO',
            id  : '42'
        };

        let res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    });
});