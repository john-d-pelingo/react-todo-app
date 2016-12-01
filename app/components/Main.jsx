let React = require('react');

// Presentational/Dumb component

// let Main = React.createClass({
//     // this.prop.children is the children components we want to be rendered
//     // Being Weather, Examples and About components
//     render: function () {
//         return (
//             <div>
//                 <Nav />
//                 <h2>Main Component</h2>
//                 {this.props.children}
//             </div>
//         );
//     }
// });

// Stateless functional component
// Doesn't maintain any state
// Using Grid Foundation component

// small screen is defaulted to 12 columns
// medium screens will occupy 6 columns
// large screens will occupy 4 columns
// small-centered will center column on every width
let Main = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

module.exports = Main;