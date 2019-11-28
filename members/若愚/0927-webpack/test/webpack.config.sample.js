var webpack = require('webpack');
module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname + '/js',
        filename: "merge.js"
    },
    resolve: {
        aligns: {
            jquery: './node_modules/jquery/dist/jquery.min.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
};