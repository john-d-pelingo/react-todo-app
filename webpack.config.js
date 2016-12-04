const webpack = require('webpack');
const path = require('path');
const envFile = require('node-env-file');

//=========================================================
//  ENVIRONMENT VARS
//---------------------------------------------------------
// Fetch an environment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Check if the .env file exists and load the environment variables
try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {
}

const ENV_DEVELOPMENT = process.env.NODE_ENV === 'development';
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';
const ENV_TEST = process.env.NODE_ENV === 'test';

const HOST = '0.0.0.0';
const PORT = 3000;

//=========================================================
//  LOADERS
//---------------------------------------------------------
const loaders = {
    // Convert jsx files into es5 code that we can use today
    js: {
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
};

//=========================================================
//  CONFIG
//---------------------------------------------------------

const config = {};
module.exports = config;

// Where to start processing our code
// Inputs
config.entry = [
    // script! is to package the scripts to webpack
    // In other words, allow jQuery in our components
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx'
];

// Provide a set of key-value pairs where the key is the module name
// and the value is the variable name we want available inside of our
// external script files
config.externals = {
    // Let foundation properly attach its methods onto the jQuery object
    jquery: 'jQuery'
};

// Provide a shortcut
// Which variable names to look for (like $ for jQuery) and if it finds them
// and there is no other variable declared then tell webpack to go ahead and
// require the variable and name it that variable
config.plugins = [
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
    }),
    // Create a process variable that has the property env
    new webpack.DefinePlugin({
        'process.env': {
            // Single quotes test means that NODE_ENV value will be set to whatever the variable test equals
            // when it runs the define plugin ('test')
            // To set it to a string wrap it in double quotes ('"test"')
            // or use JSON.stringify()
            NODE_ENV           : JSON.stringify(process.env.NODE_ENV),
            API_KEY            : JSON.stringify(process.env.API_KEY),
            AUTH_DOMAIN        : JSON.stringify(process.env.AUTH_DOMAIN),
            DATABASE_URL       : JSON.stringify(process.env.DATABASE_URL),
            STORAGE_BUCKET     : JSON.stringify(process.env.STORAGE_BUCKET),
            MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
        }
    })
];

// Specify where to dump the bundled file
// Output
config.output = {
    // Path to the folder
    // NodeJS exclusive __dirname: path to the current folder
    path      : __dirname,
    filename  : './public/bundle.js',
    // publicPath: './public/'
};

config.resolve = {
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
};

// Add the loader into the modules
config.module = {
    loaders: [
        loaders.js
    ]
};

// Include the sass files made by foundation-sites
// We can override their variables to fit our needs
config.sassLoader = {
    includePaths: [
        // Lets us combine 2 paths
        path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
};

// Create source map which are very important debugging tools
// cheap-module-eval-source-map not working
// devtool: 'cheap-module-eval-source-map'
// devtool   : process.env.NODE_ENV === 'production' ? undefined : 'inline-source-map'
// or
// devtool: 'eval-source-map'
config.devtool = process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map';

// if (ENV_DEVELOPMENT) {
//
//     config.plugins.push(
//         new webpack.HotModuleReplacementPlugin()
//     );
//
//     config.devServer = {
//         contentBase       : './app',
//         historyApiFallback: true,
//         host              : HOST,
//         hot               : true,
//         port              : PORT,
//         publicPath        : config.output.publicPath,
//         stats             : {
//             cached      : true,
//             cachedAssets: true,
//             chunks      : true,
//             chunkModules: false,
//             colors      : true,
//             hash        : false,
//             reasons     : true,
//             timings     : true,
//             version     : false
//         }
//     };
// }