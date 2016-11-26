'use strict';

var $ = require('jquery');

module.exports = {
    setTodos: function setTodos(todos) {
        // Check if array
        if ($.isArray(todos)) {
            // Take an array and convert it into string
            localStorage.setItem('todos', JSON.stringify(todos));

            // Good to check if the new todo is added
            return todos;
        }
    },
    getTodos: function getTodos() {
        var stringTodos = localStorage.getItem('todos');
        var todos = [];

        try {
            // Convert a string back into an array
            todos = JSON.parse(stringTodos);
        } catch (e) {}
        // If it fails the default array is used


        // Check if data is valid
        return $.isArray(todos) ? todos : [];
    }
};
//# sourceMappingURL=TodoAPI.js.map