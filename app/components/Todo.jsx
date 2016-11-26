let React = require('react');

let Todo = React.createClass({
    render: function () {
        let {id, text, completed} = this.props;

        return (
            <div className="todo" onClick={() => {
                this.props.onToggle(id);
            }}>
                {
                    /* Show warning without onChange handler, so I just return
                     */
                }
                <input type="checkbox" checked={completed} onChange={() => {}}/>
                {text}
            </div>
        );
    }
});

module.exports = Todo;