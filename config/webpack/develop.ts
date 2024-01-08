/**
 * @description 开发环境配置
 */

import DotenvWebpackPlugin from 'dotenv-webpack';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ProgressBarWebpackPlugin from 'webpackbar';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { app, dir } from '../index.ts';
import common from './common.ts';
import * as rules from './rules.ts';

const config: Configuration = {
  mode: 'development',
  cache: { type: 'memory' },
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: app.name,
      publicPath: '/',
      favicon: './assets/favicon.svg',
      template: './assets/index.html',
      templateParameters: {
        title: app.name,
        version: app.version,
      },
    }),
    new DotenvWebpackPlugin({
      path: resolve(dir.env, 'dev.env'),
    }),
    new ProgressBarWebpackPlugin(),
    new ForkTSCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ],
  module: {
    rules: [
      rules.SassRule,
      rules.LessRule,
      rules.SVGRule,
      rules.AssetsRule,
      rules.TSDevRule,
    ],
  },
};

export default merge(common, config);
