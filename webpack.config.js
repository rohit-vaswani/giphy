const path = require('path');
const webpack =  require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: ['./index.js'],
    output : {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    target: 'web',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
            'API_KEY': '8kglFvxMyOYqhUEEja1S4A4sP3juxyoe'
        }
      })
    ]
}