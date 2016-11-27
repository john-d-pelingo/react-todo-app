"use strict";

var React = require('react');

var TodoSearch = React.createClass({
    displayName: "TodoSearch",

    handleSearch: function handleSearch() {
        // No need to call e.preventDefault()

        // Get the status of the checkbox input
        var showCompleted = this.refs.showCompleted.checked;
        var searchText = this.refs.searchText.value;

        this.props.onSearch(showCompleted, searchText);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "container__header" },
            React.createElement(
                "div",
                null,
                React.createElement("input", { type: "search", ref: "searchText", placeholder: "Search todos", onChange: this.handleSearch })
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    React.createElement("input", { type: "checkbox", ref: "showCompleted", onChange: this.handleSearch }),
                    "Show completed todos"
                )
            )
        );
    }
});

module.exports = TodoSearch;
//# sourceMappingURL=TodoSearch.js.map