const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '/app'),
  
    entry: [
        './app.js', 
        './scss/style.scss'
    ],
  
    output: {
      path: path.join(__dirname, '/public'),
      filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/ 
            },
            { 
                test: /\.jsx$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/ 
            },
            { 
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        'sass-loader',
                    ]
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ 
          filename: 'css/[name].min.css',
          allChunks: true,
        })
      ]
}