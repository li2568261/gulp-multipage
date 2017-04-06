## 基于gulp的多页应用打包


### 实现功能主要有

> * 热加载，本地服务器，文件监听，动态刷新
> * 处理图片（优化图片，压缩）
> * 处理scss（压缩合并，兼容前缀，base64，md5，雪碧图，px2rem高清方案）
> * 处理js（模块化开发，压缩合并混淆）
> * html动态更新css，js引用的md5码


### 使用方法

1. 依赖安装

    - 安装nodejs 本机采用v6.10.1版本
    - git clone git@github.com:li2568261/gulp-multipage.git
    - 在当前目录下打开命令行（tips：按住shift点击鼠标右键可在菜单处快速打开）
    - 运行npm install 等待安装即可


2. 资源代码目录（根据demo）：

    - 资源目录src


    - src的lib目录存放公用资源:
  

    ```
    目前主要包含三个目录:

    1-commonHtml存放页面公用部分

    2-images存放相关图片，下面得sprite存放合成雪碧图相关图片

    3-js存放js组件，以及一些通用方法

    4-scss存放相关公用样式、组件样式、sprite相关类样式
    
        ├─commonHtml
        │      header.html
        │      footer.html
        ├─images
        │  └─sprite
        │      ├─a
        │      └─index
        ├─js
        └─scss
    ```
   
   
    - pages目录不同的页面新建不同的文件夹，里面都存在相同的目录结构：


    ```
        在页面当前目录下直接存放html文件命名自取最终导出html文件名与初始命名相同；
        在页面上的js已经scss文件夹分别存放相应的js和样式文件，命名无要求吗，导出文件名称格式为(页面名称).min.[js|css]；
        ├─a
        │  │  a.html
        │  ├─images
        │  ├─js
        │  │   a.js
        │  └─scss
        │      a.scss
        └─index
            │  index.html
            ├─images
            ├─js
            │  index.js
            └─scss
               index.scss
    ```

3. 页面资源配置

>参照/config/pagesConfig.js配置,建议遵守demo上的路径配置规则（ps未配置的页面不会进行资源整合处理）

```javascript
    //以下分别为js和样式文件的别名设置
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
    //allConfig只需要添加需要额外加入的文件;"额外、额外、额外重要的事情说三遍"
    
    //使用雪碧图请加入styleAlias.spriteMixin文件例index项下的import_style，"雪碧图+spriteMixin*3"
    var allConfig = {
        a:{
            import_js:[jsFileAlias.jq,jsFileAlias.libjs],
            import_style:[styleAlias.common]
        },
        index:{
            import_js:[jsFileAlias.jq,jsFileAlias.libjs],
            import_style:[styleAlias.spriteMixin,styleAlias.aSprite]
        }
    }

```

   
    
4. 资源导出目录


>资源导出目录dist为文件资源导出目录，需要配合启动服务器进行处理分为两个文件夹，images和pages；images仅存放通用的图片资源。pages目录结构和资源目录一致


5. 运行模式

* 开发

>在当前文件根目录下执行命令 npm run dev；
>修改src相关文件，dist相关文件也会进行相应更新

* 发布

>在当前文件根目录下执行命令 npm run pub，dist文件即为发布文件



