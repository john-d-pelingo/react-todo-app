let React = require('react');

let TodoSearch = React.createClass({
    handleSearch: function () {
        // No need to call e.preventDefault()

        // Get the status of the checkbox input
        let showCompleted = this.refs.showCompleted.checked;
        let searchText = this.refs.searchText.value;

        this.props.onSearch(showCompleted, searchText);
    },
    render      : function () {
        return (
            <div className="container__header">
                <div>
                    <input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>
                        Show completed todos
                    </label>
                </div>
            </div>
        )
    }
});

module.exports = TodoSearch;