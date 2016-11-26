let $ = require('jquery');

module.exports = {
    setTodos: function (todos) {
        // Check if array
        if ($.isArray(todos)) {
            // Take an array and convert it into string
            localStorage.setItem('todos', JSON.stringify(todos));

            // Good to check if the new todo is added
            return todos;
        }
    },
    getTodos: function () {
        let stringTodos = localStorage.getItem('todos');
        let todos = [];

        try {
            // Convert a string back into an array
            todos = JSON.parse(stringTodos);
        } catch (e) {
            // If it fails the default array is used
        }

        // Check if data is valid
        return $.isArray(todos) ? todos : [];
    }
};