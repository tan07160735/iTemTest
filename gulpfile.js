//gulp 打包配置文件


//1.导出gulp第三方模块
//2.导入模块会优先去内置模块找，如果没有去node_modules里面查找
//3.导入后就能使用 gulp的方法了
const gulp = require('gulp');

const cssmin = require('gulp-cssmin');//css压缩
const autoprefixer = require('gulp-autoprefixer');//自动添加前缀
const uglify = require('gulp-uglify');//压缩js
const babel = require('gulp-babel');//ES6转ES5
const htmlmin = require('gulp-htmlmin')//压缩HTML文件
const del = require('del');//用来删除目录
const webserver = require('gulp-webserver')//用来开启服务器
const sass = require('gulp-sass')//编译sass文件
//sass 用淘宝镜像下载的 删除镜像：npm config delete registry

//打包 css 代码
//用到的第三方模块需要导入使用
const cssHandler = () => {
    //找到需要打包文件地址，返回二进制流,可以继续调用方法
    return gulp.src('./src/css/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())//压缩代码
        .pipe(gulp.dest('./dist/css'))//写入文件。打包好的代码放到哪
}


//编译sass文件
// const sassHandler = ()=>{
//     return gulp.src('./src/sass/*.scss')
//     .pipe(sass()) //把sass代码，转换为css代码
//     .pipe(autoprefixer())//添加前缀
//     .pipe(cssmin())
//     .pipe(gulp.dest('./dist/css'))
     
// }


//打包 js 代码

const jsHandler = () => {
    return gulp.src('./src/js/*js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

//打包 html 代码

const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            removeAttributeQuotes: true,//移除属性上的双引号
            removeComments: true,//移除注释
            collapseBooleanAttributes: true,//把值为布尔值的属性，简写
            collapseWhitespace: true,//移除所有空格
            minifyCSS: true,//压缩css
            minifyJS: true,//压缩js
        }))
        .pipe(gulp.dest('./dist/pages'))
}

const indexHandler = () =>{
         return gulp.src('./src/index3.html')
         .pipe(htmlmin({
            removeAttributeQuotes: true,//移除属性上的双引号
            removeComments: true,//移除注释
            collapseBooleanAttributes: true,//把值为布尔值的属性，简写
            collapseWhitespace: true,//移除所有空格
            minifyCSS: true,//压缩css
            minifyJS: true,//压缩js
        }))
        .pipe(gulp.dest('./dist'))
}

//图片文件处理，不需要压缩。需要移动到dist文件夹

const imgHandler = () => {
    return gulp.src('./src/images/**')//所有文件，不管后缀
        .pipe(gulp.dest('./dist/images'))
}


//移动 lib 文件。里面时项目第三方依赖。已经是处理好的。只需要移动
//包括我们自己写的工具库
const libHandler = () => {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'))
}


//每次打包都要删除dist目录，再打包
//需要再项目其他代码打包前 执行这个任务。所以用 gulp.series
const delHandler = () => {
    return del(['./dist'])
}


//服务器配置
//开发过程中 直接把代码再服务器打开
//因为需要 测试
//用 NODE 开的服务器

const serverHandler = () => {
    //要打开的是dist里面压缩好的代码,dist就相当于根目录
    return gulp.src('./dist')
        .pipe(webserver({          //开启服务器
            host: 'localhost',//域名,可以自定义
            port: 8080,//端口号
            open: './index3.html',//默认打开的首页
            livereload: true,//开启热重启，代码改动，页面自动刷新

            //配置服务器代理
            //解决跨域
            proxies: [

                {
                    source: '/login', //源，代理标识符
                    target: 'http://localhost/item/shop/src/server/login.php'  // 目标地址
                },
                {
                    source:'/redit',
                    target:'http://localhost/item/shop/src/server/redit.php'
                }

            ]
    }))
    }


//监控文件，只要有修改就执行对应任务
//类似，src下的css文件有修改，就执行 cssHandler 任务

const watchHandler = () => {
    //只要css 文件改变就会执行 任务
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/lib/**', libHandler)
    gulp.watch('./src/images/**', imgHandler)
}
















//导出压缩函数
// module.exports.css = cssHandler
// module.exports.js = jsHandler
// module.exports.html = htmlHandler
// module.exports.img = imgHandler
// module.exports.lib = libHandler


//合并任务,parallel()同步执行
//执行命令 gulp default 默认任务。可以简写成 gulp
// module.exports.default = gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,libHandler)

//合并任务  series() 逐个执行。因为del任务需要先进行
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler,indexHandler, imgHandler, libHandler),
    serverHandler,
    // watchHandler
)