/**
 * @description 开发环境配置
 */

import { merge } from 'webpack-merge';

import type { Configuration } from '@rspack/core';

import { AssetsRule, SassRule, SVGRule, TSDevRule } from './loaders';
import { iPlugins } from './plugins';
import common from './rspack.common';

type AppDevParams = { scan?: boolean };

const create = (parms: { scan?: boolean } = {}): Configuration => ({
  cache: false,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  experiments: {
    incremental: true,
  },
  plugins: iPlugins('dev', parms),
  module: {
    rules: [AssetsRule, SassRule, SVGRule, TSDevRule],
  },
});

export const iCreateRspackDevelop = (params: AppDevParams) =>
  merge(common, create(params));
