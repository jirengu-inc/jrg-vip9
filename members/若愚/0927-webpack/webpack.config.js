
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "merge.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};