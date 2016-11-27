export let setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export let addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        text
    };
};

export let toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export let toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};