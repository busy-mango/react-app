/**
 * @description Webpack loader rule
 */

import sass from 'sass-embedded';

import type {
  RuleSetRule,
  RuleSetUseItem,
  SwcLoaderOptions,
} from '@rspack/core';

type SassLoaderOptions = {
  api: string;
  implementation: typeof sass;
};

const LessLoader: RuleSetUseItem = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

/**
 * 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
 * 需要 `sass-loader >= 14.2.1`
 */
const SassLoader: RuleSetUseItem = {
  loader: 'sass-loader',
  options: {
    api: 'modern-compiler',
    implementation: sass,
  } satisfies SassLoaderOptions,
};

export const SassRule: RuleSetRule = {
  test: /\.(sa|sc|c)ss$/,
  use: SassLoader,
  type: 'css/module',
};

export const LessRule: RuleSetRule = {
  test: /\.less?$/,
  use: LessLoader,
  type: 'css/module',
};

export const SVGRule: RuleSetRule = {
  test: /\.svg$/i,
  // issuer: /\.[jt]sx$/,
  use: [
    {
      loader: '@svgr/webpack',
      options: { icon: true, typescript: true },
    },
  ],
};

export const FontRule: RuleSetRule = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)$/i,
  type: 'asset',
};

export const AssetsRule: RuleSetRule = {
  test: /\.(png|jpe?g|gif|webp)$/i,
  type: 'asset/resource',
};

export const TSDevRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'builtin:swc-loader',
  exclude: /node_modules/,
  options: {
    minify: false,
    jsc: {
      transform: {
        react: {
          refresh: true,
          development: true,
          runtime: 'automatic',
        },
      },
    },
  } satisfies SwcLoaderOptions,
};

export const TSRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'builtin:swc-loader',
  exclude: /node_modules/,
};

export const CompatibleRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'builtin:swc-loader',
  include: [
    /node_modules[\\/]@?mime/,
    /node_modules[\\/]@?immer/,
    /node_modules[\\/]@?tanstack/,
  ],
};
