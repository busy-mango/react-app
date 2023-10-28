/**
 * @author 徐子梁
 * @description 生产环境配置
 */

import { resolve } from 'path';
import { merge } from 'webpack-merge';
import ProgressBarWebpackPlugin from 'webpackbar';
import DotenvWebpackPlugin from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration } from 'webpack';

import { app, dir, dirconfs } from '../index.ts';

import common from './common.ts';
import * as rules from './rules.ts';

const config: Configuration = {
  devtool: false,
  mode: 'production',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: dirconfs,
    },
  },
  output: {
    clean: true,
    path: dir.dist,
    filename: `static/[name].${app.version}.js`,
    chunkFilename: 'static/[contenthash].js',
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
      path: resolve(dir.env, 'pro.env'),
    }),
    new ProgressBarWebpackPlugin(),
    new ForkTSCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      rules.SassRule,
      rules.LessRule,
      rules.SVGRule,
      rules.AssetsRule,
      rules.TSRule,
    ],
  },
};

export default merge(common, config);
