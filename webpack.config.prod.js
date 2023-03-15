/**
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file webpack.config.prod.js
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Wednesday, 15th March 2023
 */

const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    performance: {
        hints: false
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static:
        {
            directory: path.join(__dirname, './')
        },
        compress: true,
        port: 3000

    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new cleanPlugin.CleanWebpackPlugin()
    ]
};