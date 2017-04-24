var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  contentBase: __dirname + '/prd',
  colors: true,
  inline: true,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/rest/*': {
      target: 'http://localhost:8888',
      secure: false,
      pathRewrite: {
        '^/rest': ''     //  /rest/list.php -> http://localhost:8888/list.php
      }
    }
  }
})
.listen(84,'localhost', function(err, result){
  if(err) {
    console.log(err);
  }else {
    console.log('Listening at localhost:84');
  }
});
