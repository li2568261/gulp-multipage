var path = require('path');
var dirDefault = require('./dirDefault.js');

var srcPath = dirDefault.srcPath;
var distPath = dirDefault.distPath;
var pagePath = dirDefault.pagePath;
var libPath = dirDefault.libPath;


var jsFileAlias = {
	jq : path.join(libPath,"/js/jquery-1.9.1.min.js"),
    videojs : path.join(libPath,"/js/video.js"),
    bscroll:path.join(libPath,"/js/bscroll.js")
}

var styleAlias = {
    reset : path.join(libPath,"/scss/reset.scss"),
	video : path.join(libPath,"/scss/video-js.scss"),
    dialog: path.join(libPath,"/scss/dialog.scss"),
    sprite_mixin: path.join(libPath,'/scss/sprite-mixin.scss')
}



var allConfig = {
	staff_list:{
		import_js:[],
		import_style:[styleAlias.reset]
	},
	staff_content:{
		import_js:[jsFileAlias.videojs],
		import_style:[styleAlias.reset,styleAlias.video]
	}
}


module.exports = allConfig;