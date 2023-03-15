/**
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file webpack.config.js
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Wednesday, 15th March 2023
 */

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    performance: {
        hints: false
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    devServer: {
        static:
        {
            directory: path.join(__dirname, './')
        },
        compress: true,
        port: 3000

    },
    devtool: 'inline-source-map',
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
};