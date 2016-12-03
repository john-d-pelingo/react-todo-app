import React from 'react';
// connect() is the companion to the Provider component which
// - lets our component access state properties
// - provides as the dispatch() method
import  {connect} from 'react-redux';

import * as actions from 'actions';

// Export pure react component (non-connected component) version mainly for test purposes
export class TodoSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    onSearchTextChange() {
        let {dispatch} = this.props;
        let searchText = this.refs.searchText.value;
        dispatch(actions.setSearchText(searchText));
    }

    onCheckBoxClick() {
        let {dispatch} = this.props;
        dispatch(actions.toggleShowCompleted());
    }

    render() {
        let {showCompleted, searchText} = this.props;

        return (
            <div className="container__header">
                <div>
                    <input type="search" ref="searchText" placeholder="Search todos" value={searchText}
                           onChange={this.onSearchTextChange.bind(this)}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" checked={showCompleted}
                               onChange={this.onCheckBoxClick.bind(this)}/>
                        Show completed todos
                    </label>
                </div>
            </div>
        )
    }
};

// Data is passed down from the Provider in app.jsx
// Export connected react component version as default
export default connect(
    // Which pieces of state our component wants from the redux store
    (state) => {
        return {
            // We want the properties {showCompleted, searchText} from  our redux store
            showCompleted: state.showCompleted,
            searchText   : state.searchText,
        }
    }
)(TodoSearch);