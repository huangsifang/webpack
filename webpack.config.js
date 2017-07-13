var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
	//__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
  	entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  	output: {
    	path: __dirname + "/public",//打包后的文件存放的地方
    	filename: "bundle.js"//打包后输出文件的文件名
  	},
  	module: {//在配置文件里添加JSON loader
	    loaders: [
	      {
	        test: /\.json$/,
	        loader: "json-loader"
	      },
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
	        query: {
	          presets: ['react','es2015'],
	          	env: {
			    development: {
			    plugins: [["react-transform", {
			       transforms: [{
			         transform: "react-transform-hmr",

			         imports: ["react"],

			         locals: ["module"]
			       }]
			     }]]
			    }
			  }
	        }
	      },
	      {
			test: /\.css$/,
			use: ['style-loader', 
			{
				loader: 'css-loader',
				options: {}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: function() {
						return [
							require('autoprefixer')
						];
					}
				}
			}]
		  }
	      // {
	      //   test: /\.css$/,
	      //   loader: 'style-loader!css-loader?modules!postcss-loader'//添加对样式表的处理,感叹号的作用在于使同一文件能够使用不同类型的loader
	      // }
	    ]
  	},

  	// postcss: [
   //  	require('autoprefixer')//调用autoprefixer插件
  	// ],
  	
  	plugins: [
	    new HtmlWebpackPlugin({
	      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
	    }),
    	//new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),//热加载插件
    	new webpack.optimize.UglifyJsPlugin(),
    	new ExtractTextPlugin("[name]-[hash].css")
  	],

  	devServer: {
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,//不跳转
	    inline: true,//实时刷新
	    hot: true
	}
}