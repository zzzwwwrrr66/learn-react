const path = require('path');
const reactRefresh = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'number-baseball-1112',
    mode: 'development', 
    devtool: 'source-map',
    resolve: { 
        extensions:['.js', '.jsx']
    },

    entry: { 
        app: ['./client'],
    },
    module:{
        rules:[{
            test: /\.jsx?$/, 
            loader: 'babel-loader', 
            options: { 
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                ],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "react-refresh/babel"
                ], 
            },
        }],
    },
    plugins: [
      new reactRefresh()
    ],
    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js'
    },
    devServer: {
      devMiddleware: { publicPath: '/dist' },
      static: { directory: path.resolve(__dirname) },
      hot: true,
    },
};