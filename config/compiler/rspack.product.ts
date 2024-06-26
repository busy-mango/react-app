/**
 * @description 生产环境配置
 */

import { merge } from 'webpack-merge';

import type { Configuration } from '@rspack/core';

import common from './common.ts';
import { iPlugins } from './plugins.ts';
import * as rules from './rules.ts';

const config: Configuration = {
  cache: false,
  devtool: false,
  mode: 'production',
  plugins: iPlugins('prod'),
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
