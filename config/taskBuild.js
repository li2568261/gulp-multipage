var path = require('path'),
	gulp = require('gulp'),
	px2rem = require('gulp-px3rem'), //- px转换rem
	sass = require('gulp-sass'), //- sass处理
	autoprefixer = require('gulp-autoprefixer'), //- 添加兼容前缀
	cssnano = require('gulp-cssnano'), //-压缩css
	uglify = require('gulp-uglify'), //js压缩混淆
	concat = require('gulp-concat'), //文件合并all-in-one
	base64 = require('gulp-base64'), //把后缀#base64且小于32k的图片转换成base64
	uncss = require('gulp-uncss'), //根据html和引用的css删除冗余css样式
	spritesmith = require('gulp.spritesmith'), //雪碧图
  px2rem = require('gulp-px3rem'),
	rename = require("gulp-rename"), // rename重命名
  imagemin = require('gulp-imagemin'),  //图片压缩
  gulpif = require('gulp-if'),
  htmlImport = require('gulp-html-import'),
  connect = require('gulp-connect'),
  gulpEnv = require('./envGet');
  	


module.exports = {
  /* html打包 */
  buildHtml : function (config) {
  	var pagePath = config.pagePath,
	  	commonHtmlPath = config.commonHtmlPath,
	  	distPath = config.distPath,
	  	taskName = config.name;

    gulp.task(taskName,function(){
      gulp.src(pagePath)
        .pipe(htmlImport(commonHtmlPath))
        .pipe(gulp.dest(distPath))
        .pipe(gulpif( gulpEnv=="dev" ,connect.reload()));//热更新加载
    })
  },
  /* sass 打包*/
  buildSass : function (config) {
    var taskName = config.name,
    	_cssDistName = config._cssDistName,
    	_cssDistDir = config._cssDistDir,
    	_scssArr = config._scssArr;

    gulp.task(taskName,function(){
      gulp.src(_scssArr) //- 需要处理的scss文件，放到一个数组里
      .pipe(concat(_cssDistName)) //合并scss
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(autoprefixer()) //- 添加兼容性前缀
      .pipe(px2rem({remUnit: 64}))
      .pipe(base64({extensions: [/\.(jpg|png)/i]}))  //小于32k的图片会被转为base64
      .pipe(cssnano()) //-压缩css
      .pipe(rename(_cssDistName))  //重命名css
      .pipe(gulp.dest(_cssDistDir)) //- 处理得到的css文件发布到对应目录
      .pipe(gulpif( gulpEnv=="dev" ,connect.reload()))
    })
  },
  buildSprites: function(spriteConfig,spriteTaskList){
    for(var key in spriteConfig){
      (function(key,configs){
        var taskName = key + '_sprite';
        gulp.task(taskName,function(){
          var spriteData = gulp.src(configs.spritesSource) // source path of the sprite images
                .pipe(spritesmith(
                    configs.spritesMithConfig
                ));
            spriteData.img.pipe(gulp.dest(configs.spritesDist.image)); // output path for the sprite
            spriteData.css.pipe(gulp.dest(configs.spritesDist.sass)); // output path for the CSS
        })
        spriteTaskList.push(taskName);
      }(key,spriteConfig[key]))
    }
  },
  /* js打包 */
  buildJs : function (config) {
    var taskName = config.name,
    	_jsDistDir = config._jsDistDir,
    	_jsDistName = config._jsDistName,
    	_jsArr = config._jsArr;

    gulp.task(taskName,function(){
      gulp.src(_jsArr) //- 需要处理的js文件，放到一个字符串里
      .pipe(concat(_jsDistName)) //合并js
      //.pipe(uglify()) //-压缩混淆js
      .pipe(gulp.dest(_jsDistDir)) //- 处理得到的js文件发布到对应目录
      .pipe(gulpif( gulpEnv=="dev" ,connect.reload()))
    })
  },
  /* img打包 */
  buildImg: function (src,dist) {
    var dist = dist || src;

    gulp.src(path.join(src,'/**/*.+(mp3|mp4)'))
          .pipe(gulp.dest(dist));
    return gulp.src(path.join(src,'/**/*.+(png|jpg|jpeg|gif|svg)'))
            // Caching images that ran through imagemin
        // .pipe(imagemin({
        //         interlaced: true,
        //       }))
        .pipe(gulp.dest(dist))
  }
}