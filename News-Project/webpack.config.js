var webpack = require('webpack');
var ET = require('extract-text-webpack-plugin');

module.exports = {
  //输入文件
  entry: [
    'webpack-dev-server/client?http://localhost:84',
    'webpack/hot/only-dev-server',
    __dirname + '/src/scripts/app.js'
  ],

  //输出
  output: {
    //__dirname当前路径
    path: __dirname + '/prd',
    filename: 'bundle.js'
  },

  //模块配置
  module: {
    //配置loader
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs'], //添加组件的插件配置
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        // loader: 'style!css!sass'
        //extract('备用事件（编译出错时执行）'，‘抽离前需要执行的事件’)
        // loader: ET.extract('style', 'css!sass')
        loader: ET.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.string$/,
        loader: 'string'
      }
    ]
  },
  //配置source-map
  devtool: 'source-map',
  plugins: [
    //抽离文件输出位置
    new ET('./bundle.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
}
