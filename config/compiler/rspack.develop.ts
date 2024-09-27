/**
 * @description 开发环境配置
 */

import { merge } from 'webpack-merge';

import type { Configuration } from '@rspack/core';

import { AssetsRule, SassRule, SVGRule, TSDevRule } from './loaders';
import { iPlugins } from './plugins';
import common from './rspack.common';

const config: Configuration = {
  cache: false,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  plugins: iPlugins(),
  module: {
    rules: [AssetsRule, SassRule, SVGRule, TSDevRule],
  },
};

export default merge(common, config);
