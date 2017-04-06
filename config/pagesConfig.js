var path = require('path');
var dirDefault = require('./dirDefault.js');

var srcPath = dirDefault.srcPath;
var distPath = dirDefault.distPath;
var pagePath = dirDefault.pagePath;
var libPath = dirDefault.libPath;


var jsFileAlias = {
	jq : path.join(libPath,"/js/jquery-1.9.1.min.js"),
	libjs : path.join(libPath,"/js/lib.js")
}

var styleAlias = {
	common : path.join(libPath,"/scss/base.scss"),
	spriteMixin: path.join(libPath,"/scss/sprite-mixin.scss"),
	aSprite : path.join(libPath,"/scss/a-sprite.scss"),
	indexSprite : path.join(libPath,"/scss/index-sprite.scss")
}



var allConfig = {
	a:{
		import_js:[jsFileAlias.jq,jsFileAlias.libjs],
		import_style:[styleAlias.common]
	},
	index:{
		import_js:[jsFileAlias.jq,jsFileAlias.libjs],
		import_style:[styleAlias.common,styleAlias.spriteMixin,styleAlias.aSprite]
	}
}


module.exports = allConfig;