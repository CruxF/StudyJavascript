const path = require('path')
// 配置热更新
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  // 模块配置
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  // 服务端配置
  devServer: {
    contentBase: path.join(__dirname, './release'), //根目录
    open: true, //自动打开浏览器
    port: 9000, //端口
    proxy: {
      '/api/*': {
        target: 'http://localhost:8880'
      }
    }
  }
}