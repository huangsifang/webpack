1.
使用webpack打包文件
webpack app/main.js public/bundle.js
若webpack没有全局安装，使用具体地址
node_modules/.bin/webpack app/main.js public/bundle.js

2.
配置文件命名为webpack.config.js(别忘了.js)

3.
module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"//注意为json-loader，不是json
      }
    ]
},