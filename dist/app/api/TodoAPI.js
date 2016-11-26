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
    },
    filterTodos: function filterTodos(todos, showCompleted, searchText) {
        var filteredTodos = todos;

        // Filter by showCompleted
        filteredTodos = filteredTodos.filter(function (todo) {
            // If showCompleted is checked (true) we're gonna return every single item
            return !todo.completed || showCompleted;
        });

        // Filter by searchText
        filteredTodos = filteredTodos.filter(function (todo) {
            // if (searchText !== '') {
            //     // Check if searchText.toLowerCase() exists in the todo.text.toLowerCase() text
            //     if (todo.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
            //         return true;
            //     }
            // } else {
            //     // If searchText is nothing, return every todo item
            //     return true;
            // }
            var lowerCText = todo.text.toLowerCase();
            return searchText.length === 0 || lowerCText.indexOf(searchText.toLowerCase()) !== -1;
        });

        // sort() modifies the existing array
        filteredTodos.sort(function (a, b) {
            if (a.completed && b.completed) {
                // a should come before b
                return -1;
            } else if (a.completed && !b.completed) {
                // b should come before a
                return 1;
            } else {
                // no change
                return 0;
            }
        });

        // Sort todos with non-completed first

        return filteredTodos;
    }
};
//# sourceMappingURL=TodoAPI.js.map