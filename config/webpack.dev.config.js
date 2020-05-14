const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const htmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: 'development',
    entry: path.join(__dirname, "./../example/src/index.js"),
    output: {
        path: path.join(__dirname, "./../example/src/"),
        filename: "bundle.js",
    },
    plugins: [
        new htmlWebpackPlugin({
          template: path.join(__dirname, './../example/index.html'),
          filename: 'index.html'
        })
      ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader?modules'],
            },
            {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './../example/src/'),
        compress: true,
        port: 3002,
        open: true // 自动打开浏览器
    },
};
module.exports = merge(devConfig, baseConfig); // 将baseConfig和devConfig合并为一个配置