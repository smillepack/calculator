const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const entry = require('./test.json');

module.exports = {
    mode: 'production',
    // mode: 'development',
    // devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: './dist'
    // },
    watch: false,
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'it"s Redux baby',
            template: './src/index.html',
            minify: false
        }),
        new CleanWebpackPlugin()
    ], 
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    resolve: {
        alias: {
            ReactReduxThings: path.resolve(__dirname, './src/reactReduxThings/'),
            ReactThings: path.resolve(__dirname, './src/reactThings/'),
            ReduxThings: path.resolve(__dirname, './src/reduxThings/'),
            Style: path.resolve(__dirname, './src/style/')
        }
    }
};