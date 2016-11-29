let uuid = require('node-uuid');
let moment = require('moment');

export let searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};

export let showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            // return !action.showCompleted;
            return !state;
        default:
            return state;
    }
};

export let todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                // {
                //     // Generate random ID
                //     id         : uuid(),
                //     text       : action.text,
                //     completed  : false,
                //     // Get current timestamp
                //     createdAt  : moment().unix(),
                //     completedAt: undefined
                // }
                // We generate the todo in our action so we can save it to firebase
                // This is gonna let our reducer add the new todo without worrying about the contents of the object
                action.todo
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) => {
                // Search for the id of the todo
                // Each todo is an object
                if (todo.id === action.id) {
                    let newCompleted = !todo.completed;
                    return {
                        ...todo,
                        // Flip the completed property
                        completed  : newCompleted,
                        // If completed, add a completed date
                        // If not completed, remove completed date
                        completedAt: newCompleted ? moment().unix() : undefined
                    };
                } else {
                    return todo;
                }
            });
        case 'ADD_TODOS':
            return [
                ...state,
                // The old todos stored locally
                ...action.todos
            ];
        default:
            return state;
    }
};