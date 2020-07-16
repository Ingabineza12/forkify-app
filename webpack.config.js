const path = require('path');     // use build in node package to get the exact path
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['babel-polyfill','./src/js/index.js'], // . is for the current folder
    output: {
        path : path.resolve(__dirname , 'dist'), // join __dirname which is the current absolute path ariyo forkify with dist where we want our bundle to be in 
        filename : 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'          // include folder where webpack should serve our files
    },

    plugins : [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'./src/index.html'
        })

    ],

    module: {    // for setting up webpack loaders to convert from ES6 to ES5
        rules: [
            {
                test: /\.js$ /,      // we want to test all the js files
                exclude: /node_modules/,
                use: {
                    loader : 'babel-loader'
                }

            }
        ]
    }
    

};