/**
 * @description Webpack loader rule
 */

import path from 'path';
import type { LoaderContext, RuleSetRule, RuleSetUseItem } from 'webpack';

import { dirname } from '../index.ts';

const LessLoader: RuleSetUseItem = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
};

const CssLoader: RuleSetUseItem = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      exportLocalsConvention: 'camelCaseOnly',
      auto: (resource: string) => {
        const relative = path.relative(dirname, resource);
        // const isGlobal = resource.endsWith('.global.scss');
        const isModules = relative.startsWith('node_modules');
        return !isModules;
      },
      mode: (resource: string) => {
        if (/pure.(sa|sc|c)ss$/i.test(resource)) return 'pure';
        if (/global.(sa|sc|c)ss$/i.test(resource)) return 'global';
        return 'local';
      },
      getLocalIdent: (
        context: LoaderContext<unknown>,
        _: string,
        name: string
      ) => {
        const { resourcePath } = context;
        const relative = path.relative(dirname, resourcePath);
        const { dir, name: filename } = path.parse(relative);
        const prefix = dir.split(path.sep).join('_');
        return `${prefix}_${filename}_${name}`;
      },
    },
  },
};

export const SassRule: RuleSetRule = {
  test: /\.(sa|sc|c)ss$/,
  use: ['style-loader', CssLoader, 'sass-loader'],
};

export const LessRule: RuleSetRule = {
  test: /\.less?$/,
  use: ['style-loader', CssLoader, LessLoader],
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
  loader: 'swc-loader',
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
  },
};

export const TSRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'swc-loader',
  exclude: /node_modules/,
};
