var path = require('path');

var fs = require('fs');

var dirDefault = require('./dirDefault.js');

var  gulpEnv = require('./envGet.js');

var srcPath = dirDefault.srcPath;
var distPath = dirDefault.distPath;
var pagePath = dirDefault.pagePath;
var libPath = dirDefault.libPath;

var spriteConfigs = {};
function spriteConfigSet(){
	
	//获取sprite路径
	var	spritePath = path.join(libPath,'images/sprite'),
	spriteList = fs.readdirSync(spritePath);

	spriteList.forEach(function(spriteName,i){
		
		var spritesSource = path.join(spritePath,spriteName,'/*.*'),
		imgName = spriteName+ ((gulpEnv && gulpEnv=="pub")? new Date().getTime() : '') +'.png',
		cssName = spriteName+'-sprite.scss';

		var config = {
			spritesSource : spritesSource,
			spritesMithConfig: {
			    //这里的cssOpts用来当成最终scss文件中的变量名，详情看scss.template.mustache
			    cssOpts: 'spriteSrc',
			    imgName: imgName,
			    cssName: cssName,
			    cssFormat: 'scss',
			    cssTemplate: 'scss.template.mustache',
			    algorithm: 'binary-tree',
			    cssVarMap: function(sprite) {
			      sprite.name = 'icon-' + sprite.name
			    }
			},
			spritesDist:{
				image:path.join(distPath,'/images/sprites/'),
				sass:path.join(libPath,'/scss/')
			}
		}
		spriteConfigs[spriteName] = config;
	})
}

spriteConfigSet();
module.exports = spriteConfigs;