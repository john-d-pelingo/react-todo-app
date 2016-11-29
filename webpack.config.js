let webpack = require('webpack');
let path = require('path');

// Fetch an environment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
    // Where to start processing our code
    // Inputs
    entry     : [
        // script! is to package the scripts to webpack
        // In other words, allow jQuery in our components
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        './app/app.jsx'
    ],
    // Provide a set of key-value pairs where the key is the module name
    // and the value is the variable name we want available inside of our
    // external script files
    externals : {
        // Let foundation properly attach its methods onto the jQuery object
        jquery: 'jQuery'
    },
    // Provide a shortcut
    // Which variable names to look for (like $ for jQuery) and if it finds them
    // and there is no other variable declared then tell webpack to go ahead and
    // require the variable and name it that variable
    plugins   : [
        // The key is the variable name to watch for and the value is the module
        // to replace it with
        new webpack.ProvidePlugin({
            '$'     : 'jquery',
            'jQuery': 'jquery'
        }),
        // Set some configs for the UglifyJsPlugin which comes with webpack
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    // Specify where to dump the bundled file
    // Output
    output    : {
        // Path to the folder
        // NodeJS exclusive __dirname: path to the current folder
        path    : __dirname,
        filename: './public/bundle.js'
    },
    resolve   : {
        root              : __dirname,
        // Always look for modules in components folder by default
        // instead of specifying it one by one
        modulesDirectories: [
            'node_modules',
            './app/components',
            './app/api'
        ],
        // Pick names for our components
        // Tell webpack where to find that component
        alias             : {
            // Aliases to end all aliases
            // Simple way to access any of our modules
            app: 'app',

            applicationStyles: 'app/styles/app.scss',
            actions          : 'app/actions/actions.jsx',
            reducers         : 'app/reducers/reducers.jsx',
            configureStore   : 'app/store/configureStore.jsx'
        },
        // List of file extensions that we want to process
        extensions        : ['', '.js', '.jsx'],
    },
    // Add the loader into the modules
    module    : {
        loaders: [
            // Convert jsx files into es5 code that we can use today
            {
                // The module
                loader : 'babel-loader',
                // Take the files and parse them through react, get the output then run them through es2015
                query  : {
                    // stage-0 enables es6 features
                    presets: ['react', 'es2015', 'stage-0']
                },
                // Tell which files to parse
                test   : /\.jsx?$/,
                // Tell which folders we don't want to have parsed
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    // Include the sass files made by foundation-sites
    // We can override their variables to fit our needs
    sassLoader: {
        includePaths: [
            // Lets us combine 2 paths
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    // Create source map which are very important debugging tools
    // cheap-module-eval-source-map not working
    // devtool: 'cheap-module-eval-source-map'
    devtool   : process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map'
    // or
    // devtool: 'eval-source-map'

};
