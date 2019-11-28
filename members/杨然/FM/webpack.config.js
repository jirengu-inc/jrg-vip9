module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname + '/js/',//当前文件夹下
        filename: "merg.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }//test是匹配器，.css后缀的使用这个loader，和webpack ./entry.js bundle.js --module-bind 'css=style!css'是一样的
        ]//数组
    }
};