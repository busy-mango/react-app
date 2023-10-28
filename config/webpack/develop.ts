/**
 * @author 徐子梁
 * @description 开发环境配置
 */

import { resolve } from 'path';
import { merge } from 'webpack-merge';
import ProgressBarWebpackPlugin from 'webpackbar';
import DotenvWebpackPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import type { Configuration } from 'webpack';

import { app, dir } from '../index.ts';

import common from './common.ts';
import * as rules from './rules.ts';

const config: Configuration = {
  mode: 'development',
  cache: { type: 'memory' },
  devtool: 'eval-cheap-module-source-map',
  experiments: { lazyCompilation: true },
  output: {
    clean: true,
    path: dir.dist,
    filename: `static/[name].${app.version}.js`,
    chunkFilename: 'static/[name].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: app.name,
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
    new ReactRefreshWebpackPlugin(),
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
