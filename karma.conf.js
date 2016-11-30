// karma : basic test runner
// karma-chrome-launcher : for chrome
// karma-mocha : integrate mocha with karma
// karma-mocha-reporter : checkboxes in the terminal
// karma-mocha-sourcemap-loader : use the actual jsx file paths and not the compressed webpack bundle file
// karma-webpack : integrate webpack with karma
// mocha : gives series of functions to make testing JavaScript easy
// expect : assertion functions

let webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    let browsers = ['Chrome', 'ChromeCanary'];
    if (process.env.TRAVIS) {
        browsers = ['Chrome_travis_ci'];
    }

    config.set({
        // Specify which browsers we want are tests to run in
        browsers: browsers,
        singleRun    : true,
        // Use the mocha framework for tests
        frameworks   : ['mocha'],
        // Which test files to run
        // Globing pattern
        // We want to get files in the test folder or in any folder in the test folder (subdirectory)
        // that have a file name of anything but end in .test.jsx
        files        : [
            // Allow jQuery in our components
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/foundation-sites/dist/foundation.min.js',
            'app/tests/**/*.test.jsx',
        ],
        // Which preprocessors to use
        // Things we wanna do with our test files
        // For any of the specified files we wanna run webpack and sourcemap
        preprocessors: {
            'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        // Clean up the output
        // Shows which things passed and which things failed
        reporters    : ['mocha'],
        // Test timeouts
        // Send details down into the individual framework
        client       : {
            // Use mocha
            mocha: {
                // If a test never ends, cancel it at a certain point of time
                // 10 seconds
                timeout: '10000'
            }
        },
        // Load webpack config
        webpack      : webpackConfig,
        webpackServer: {
            noInfo: true
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
    });
};