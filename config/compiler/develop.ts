/**
 * @description 开发环境配置
 */

import { merge } from 'webpack-merge';

import type { Configuration } from '@rspack/core';

import common from './common.ts';
import { iPlugins } from './plugins.ts';
import * as rules from './rules.ts';

const config: Configuration = {
  cache: false,
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    minimize: false,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'async',
    },
  },
  plugins: iPlugins(),
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
