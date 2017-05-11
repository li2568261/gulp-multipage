var path = require('path');
var dirDefault = require('./dirDefault.js');

var srcPath = dirDefault.srcPath;
var distPath = dirDefault.distPath;
var pagePath = dirDefault.pagePath;
var libPath = dirDefault.libPath;


var jsFileAlias = {
	jq : path.join(libPath,"/js/jquery-1.9.1.min.js"),
	common : path.join(libPath,"/js/common.js"),
	star : path.join(libPath, "/js/star.js")
}

var styleAlias = {
    reset : path.join(libPath,"/scss/reset.scss"),
    icon : path.join(libPath,"/scss/icon.scss"),
    sprite_mixin: path.join(libPath,'/scss/sprite-mixin.scss')
}

var components = {
	nav : {
		js: path.join(libPath,"/components/nav/nav.js"),
		scss: path.join(libPath,"/components/nav/nav.scss")
	}
}
var plugins = {
	video : {
		js : path.join(libPath,"/plugins/video/video.js"),
		scss : path.join(libPath,"/plugins/video/video-js.scss"),
	},
	slick:{
		js : path.join(libPath,"/plugins/slick/slick.min.js"),
		scss : path.join(libPath,"/plugins/slick/slick.scss")
	},
	bscroll: {
		js: path.join(libPath,"/plugins/bscroll/bscroll.min.js")
	}
}

var allConfig = {
	index:{
		import_js:[
			jsFileAlias.jq,
			jsFileAlias.common,
			plugins.bscroll.js,
			plugins.slick.js,
			components.nav.js
		],
		import_style:[
			styleAlias.reset,
			components.nav.scss,
			plugins.slick.scss
		]
	},
	course_list:{
		import_js:[
			jsFileAlias.jq,
			jsFileAlias.common,
			plugins.bscroll.js,
			components.nav.js
		],
		import_style:[
			styleAlias.reset,
			components.nav.scss,
		]
	},
	course_content:{
		import_js:[
			jsFileAlias.jq,
			jsFileAlias.common,
			jsFileAlias.star,
			plugins.bscroll.js,
			plugins.video.js,
		],
		import_style:[
			styleAlias.reset,
			styleAlias.icon,
			plugins.video.scss,
		]
	}
}


module.exports = allConfig;