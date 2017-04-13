var path = require('path');
var dirDefault = require('./dirDefault.js');

var srcPath = dirDefault.srcPath;
var distPath = dirDefault.distPath;
var pagePath = dirDefault.pagePath;
var libPath = dirDefault.libPath;


var jsFileAlias = {
	jq : path.join(libPath,"/js/jquery-1.9.1.min.js"),
    commonjs : path.join(libPath,"/js/common.js"),
    bscroll:path.join(libPath,"/js/bscroll.js")
}

var styleAlias = {
    reset : path.join(libPath,"/scss/reset.scss"),
	common : path.join(libPath,"/scss/base.scss"),
    dialog: path.join(libPath,"/scss/dialog.scss"),
    sprite_mixin: path.join(libPath,'/scss/sprite-mixin.scss')
}



var allConfig = {
	index:{
		import_js:[jsFileAlias.jq,jsFileAlias.commonjs],
		import_style:[styleAlias.reset,styleAlias.common,styleAlias.dialog]
	},
    rule:{
        import_js:[jsFileAlias.jq,jsFileAlias.commonjs,jsFileAlias.bscroll],
        import_style:[styleAlias.reset,styleAlias.common,styleAlias.dialog]
    },
    rank:{
        import_js:[],
        import_style:[styleAlias.reset,styleAlias.common]
    }
}


module.exports = allConfig;