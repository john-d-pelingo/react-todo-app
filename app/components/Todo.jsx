let React = require('react');

let Todo = React.createClass({
    render : function () {
        let {id, text} = this.props;

        return (
            <div>
                {id}: {text}
            </div>
        );
    }
});

module.exports = Todo;