var path = require('path')
var webpack = require('webpack')
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')
var TEM_PATH = path.resolve(ROOT_PATH, 'templates')
// OccurrenceOrderPlugin 根据模块调用次数,给模块分配ids
var HtmlwebpackPlugin = require('html-webpack-plugin')
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors','common.js')
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    mangle: {
        except: ['$super', '$', 'exports', 'require']
    }
});
module.exports = {
    devtool: 'cheap-module-eval-source-map',//用这个source-map
    entry: {
        vendors:['react', 'react-dom' , 'whatwg-fetch'],
        app: path.resolve(APP_PATH, 'index.jsx'),
        post:path.resolve(APP_PATH, 'post.jsx')
    },
  output: {
    path: BUILD_PATH,
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),commonsPlugin,UglifyJsPlugin,
        new HtmlwebpackPlugin({
        title: 'andyketter',
        template: path.resolve(TEM_PATH, 'index.html'),
        filename: 'index.html',
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: ['app', 'vendors'],
        //要把script插入到标签里
        inject: 'body',
        hash:true
        }),
        new HtmlwebpackPlugin({
        title: 'fetch demo',
        template: path.resolve(TEM_PATH, 'index.html'),
        filename: 'post.html',
        chunks: ['post', 'vendors'],
        inject: 'body',
        hash:true
      })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // contentBase:'/static/'
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
      loaders: [
          { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/, include: APP_PATH },
          { test: /\.scss$/,loaders: ['style', 'css', 'sass'] }
      ]
  }
}
