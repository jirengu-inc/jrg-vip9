require("./css/fm.css");

var Music = require("./js/fm.js");

Music.init($('.fm-body'));

// webpack --progress --colors --watch  //监视
// webpack-dev-server --progress --colors //开发者服务器打开localhost:8080