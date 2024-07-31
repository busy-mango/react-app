/**
 * @description 测试环境配置
 */

import { merge } from 'webpack-merge';

import type { Configuration } from '@rspack/core';

import {
  AssetsRule,
  CompatibleRule,
  SassRule,
  SVGRule,
  TSRule,
} from './loaders';
import { iPlugins } from './plugins';
import common from './rspack.common';

const config: Configuration = {
  plugins: iPlugins('sit'),
  module: {
    rules: [AssetsRule, CompatibleRule, SassRule, SVGRule, TSRule],
  },
};

export default merge(common, config);
