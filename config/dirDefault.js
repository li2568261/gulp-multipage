var path = require('path');
var srcPath =  path.resolve(__dirname,'../src');
var distPath = path.resolve(__dirname,'../dist');
var pubPath = path.resolve(__dirname,'../pub');
var pagePath =  path.resolve(srcPath,'pages');
var libPath = path.resolve(srcPath,'lib');

module.exports = {srcPath,distPath,pagePath,libPath,pubPath}

