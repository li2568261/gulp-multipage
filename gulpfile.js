
var gulp = require('gulp'),
  os = require('os'),
  path = require('path'),
  fs   = require('fs'),
  connect = require('gulp-connect'), //- 创建服务器
  gulpOpen = require('gulp-open'), //用指定软件打开文件
  revCollector = require("gulp-rev-collector"),
  clean = require('gulp-clean'),
  buildFuc = require('./config/taskBuild')
  dirDefault = require('./config/dirDefault'),
  pagesConfig = require('./config/pagesConfig'),
  spriteConfig = require('./config/spriteConfig');

//存放各个目录的变量
var srcPath = dirDefault.srcPath;
var distPath = dirDefault.distPath;
var pagePath = dirDefault.pagePath;
var libPath = dirDefault.libPath;



//task目录
var taskArr = [];
var jsTaskList = [];
var sassTaskList = [];
var spriteTaskList = [];
var htmlTaskList = [];

//选取谷歌浏览器
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));


//图片相关task
gulp.task("spriteTaskListInit",function(){
   buildFuc.buildSprites(spriteConfig,spriteTaskList);
})

gulp.task("sprite",["spriteTaskListInit"],function(){
  gulp.run(spriteTaskList);
  buildFuc.buildImg(path.join(distPath,'/images/sprites/*'));
})

gulp.task("images",function(){
  buildFuc.buildImg(pagePath,path.join(distPath,'/pages/'));
})

/*---------------------------------------------*/

//页面资源相关task

gulp.task('pages', function () {
    gulp.src(path.join(pagePath,'/**/*html'))
        .pipe(htmlImport(path.join(libPath,'/commonHtml/')))
        .pipe(gulp.dest(path.join(distPath,'/pages/'))); 
})

gulp.task("taskInit",function(){

    var buildModule = function(config){
        buildFuc.buildJs(config.js);
        buildFuc.buildSass(config.sass);
        buildFuc.buildHtml(config.page);
    }

    for(let key in pagesConfig){
        //配置适配设置
        let moduleConfig = {};
        moduleConfig.page = {};
        moduleConfig.page.name = key+"_html";
        moduleConfig.page.pagePath = path.join(pagePath,'/'+key+'/*.html');
        moduleConfig.page.commonHtmlPath=path.join(libPath,'/commonHtml/');
        moduleConfig.page.distPath = path.join(distPath,'/pages/'+key+'/');

        pagesConfig[key].import_style.push(pagePath+'/'+key+'/scss/*.scss');
        moduleConfig.sass = {};
        moduleConfig.sass.name = key+'_sass';
        moduleConfig.sass._scssArr = pagesConfig[key].import_style;
        moduleConfig.sass._cssDistName = key+".min.css";
        moduleConfig.sass._cssDistDir = path.join(distPath,'/pages/'+key+'/css/');

        pagesConfig[key].import_js.push(pagePath+'/'+key+'/js/*.js');
        moduleConfig.js = {};
        moduleConfig.js.name = key+'_js';
        moduleConfig.js._jsArr = pagesConfig[key].import_js;
        moduleConfig.js._jsDistName = key+".min.js";
        moduleConfig.js._jsDistDir = path.join(distPath,'/pages/'+key+'/js/');

        buildModule(moduleConfig)
        taskArr.push(moduleConfig.js.name,moduleConfig.sass.name,moduleConfig.page.name);
        jsTaskList.push(moduleConfig.js.name);
        sassTaskList.push(moduleConfig.sass.name);
        htmlTaskList.push(moduleConfig.page.name);
    }

})

gulp.task("moduleRun",['taskInit'],function(){
  gulp.run(taskArr);
})

/*---------------------------------------------*/


//md5命替换
gulp.task('rev', function () {
  return gulp.src([path.join(distPath,'/pages/**/*.json'),path.join(distPath,"/pages/**/*.html")])
      .pipe(revCollector({
          replaceReved: true,
      }))
      .pipe(gulp.dest(path.join(distPath,'/pages/')));
})

gulp.task('pictureInit',['sprite','images'])

// 启动服务器，端口8888，开启自动刷新，打开chrome浏览器
gulp.task('web', function() {
  connect.server({
    root: distPath,
    port: 8888,
    livereload: true
  });
  gulp.src(__filename)
    .pipe(gulpOpen({
      uri: 'http://localhost:8888/pages/index',
      app: browser
    }));
});

gulp.task('dist_clean',function(){
  gulp.src(distPath)
    .pipe(clean());
})

//发布
gulp.task('pub',['pictureInit','moduleRun']);

//开发
gulp.task('dev',['pictureInit','moduleRun'],function(){

  var pagesList = fs.readdirSync(pagePath);

  pagesList.forEach(function(pagename,i) {
    var curPath = path.join(pagePath,pagename);
    var curPathJs = path.join(curPath,'/js/*.js')
    var curPathScss = path.join(curPath,'/scss/*.scss');
    var curPathHtml = path.join(curPath,'/*.html')

    gulp.watch(curPathJs,[pagename+'_js']);
    gulp.watch(curPathScss,[pagename+'_sass']);
    gulp.watch(curPathHtml,[pagename+'_html']);
  })
  
  var libJs = path.join(libPath,'/js/*.js');
  var libScss = path.join(libPath,'/scss/*.scss');
  var libHtml = path.join(libPath,'/commonHtml/*.html')
  gulp.watch(libJs,jsTaskList);
  gulp.watch(libScss,sassTaskList);
  gulp.watch(libHtml,htmlTaskList);

  //启动服务器
  gulp.run('web');
})