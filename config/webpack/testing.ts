/**
 * @description 测试环境配置
 */

import DotenvWebpackPlugin from 'dotenv-webpack';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ProgressBarWebpackPlugin from 'webpackbar';

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
      path: resolve(dir.env, 'sit.env'),
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
      rules.CompatibleRule,
      rules.TSRule,
    ],
  },
};

export default merge(common, config);
