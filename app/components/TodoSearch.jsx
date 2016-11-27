let React = require('react');
let {connect} = require('react-redux');
let actions = require('actions');

// Export this pure react component (non-connected component) for test purposes
// Export non-connected react component version
export let TodoSearch = React.createClass({
    // No longer need these since we will do it the redux-react way
    // handleSearch: function () {
    //     // No need to call e.preventDefault()
    //
    //     // Get the status of the checkbox input
    //     let showCompleted = this.refs.showCompleted.checked;
    //     let searchText = this.refs.searchText.value;
    //
    //     this.props.onSearch(showCompleted, searchText);
    // },
    render      : function () {
        let {dispatch, showCompleted, searchText} = this.props;

        return (
            <div className="container__header">
                <div>
                    {/* We no longer use the handleSearch function */}
                    {/*<input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>*/}
                    <input type="search" ref="searchText" placeholder="Search todos" value={searchText} onChange={() => {
                        let searchText = this.refs.searchText.value;
                        dispatch(actions.setSearchText(searchText));
                    }}/>
                </div>
                <div>
                    <label>
                        {/* We no longer use the handleSearch function */}
                        {/*<input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>*/}
                        <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                            dispatch(actions.toggleShowCompleted());
                        }}/>
                        Show completed todos
                    </label>
                </div>
            </div>
        )
    }
});

// We already have the dispatch() function which is provided by the store
// and we don't need data since it is passed down from the Provider in app.jsx
// This will be the default export and we can use import to get it
// Export the connected react component version
export default connect(
    // Define default search text
    (state) => {
        return {
            showCompleted: state.showCompleted,
            searchText   : state.searchText,
        }
    }
)(TodoSearch);

// module.exports = TodoSearch;