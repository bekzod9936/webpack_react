/**
 * Created by: Andrey Polyakov (andrey@polyakov.im)
 */
import {resolve} from 'path';

import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {DefinePlugin, ProvidePlugin} from 'webpack';

import env from './env';
import defineList from './resources/define';
import htmlPluginConfg from './resources/html';
import provideList from './resources/provide';

export default [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: env.isDev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: env.isDev ? '[id].css' : '[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin(htmlPluginConfg),
    new ProvidePlugin(provideList),
    new DefinePlugin(defineList),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
        async: env.isDev,
        typescript: {
            configFile: resolve(__dirname, '../tsconfig.json'),
        },
        eslint: {enabled: true, files: '../src/**/*.{ts,tsx,js,jsx}'},
        logger: {infrastructure: 'silent', issues: 'console'},
    }),
];
