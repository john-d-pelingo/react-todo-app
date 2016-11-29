import moment from 'moment';

// No need to specify index.js if that is the only file in there like in this case
import firebase, {firebaseRef} from 'app/firebase/';

export let setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export let addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        // After implementing startAddTodo() in the actions a string is no longer passed through
        // Instead a todo object is passed
        todo
    };
};

export let addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

// The main reason that we put the new todo in the actions is because moment().unix() and uuuid
// were 3rd party calls such as asynchronous calls where the output values were different every time
// This means that the reducer would be impure
export let startAddTodo = (text) => {
    // redux-thunk allows as to return functions that get executed like in this case
    // dispatch is gonna let us dispatch some actions after our data gets saved in this case to firebase
    // getState gets the current state of the redux store
    return (dispatch, getState) => {
        let todo = {
            // No need for the new ID since firebase generates it
            // id         : uuid(),
            text,
            completed  : false,
            // Get current timestamp
            createdAt  : moment().unix(),
            // Firebase requires null instead for empty values
            // completedAt: undefined,
            completedAt: null
        };

        let todoRef = firebaseRef.child('todos').push(todo);
        // console.log('STAGE 1');

        // Synchronize with firebase
        // We return the promise so we can use it for tests
        return todoRef.then(
            () => {
                // console.log('STAGE 2');
                // We dispatch the action addTodo which is defined above
                dispatch(
                    // now addTodo receives objects instead of text
                    addTodo(
                        {
                            ...todo,
                            id: todoRef.key
                        }
                    )
                );
            },
            (error) => {
                console.log('Firebase error ', error);
            }
        );
    };
};

export let toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

// export lettoggleTodo = (id) => {
//     return {
//         type: 'TOGGLE_TODO',
//         id
//     };
// };

export let updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export let startToggleTodo = (id, completed) => {
    // redux-thunk allows as to return functions that get executed like in this case
    return (dispatch, getState) => {
        // let todoRef = firebaseRef.child('todos/' + id);
        // ES6 template strings
        let todoRef = firebaseRef.child(`todos/${id}`);

        // Change completed property to whatever was passed in

        let updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };

        // We return the promise so we can use it for tests
        return todoRef.update(updates).then(() => {
            dispatch(updateTodo(id, updates));
        });
    };
};