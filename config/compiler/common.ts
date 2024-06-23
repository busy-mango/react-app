/**
 * @description 公共配置
 */

import { parse } from 'dotenv';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { assign } from '@busymango/utils';
import type {
  Configuration,
  RspackPluginFunction,
  RspackPluginInstance,
} from '@rspack/core';
import { rspack } from '@rspack/core';
import ReactRefreshRspackPlugin from '@rspack/plugin-react-refresh';

import { app, dir } from '../index.ts';

const { version = '0.0.0' } = app;

const config: Configuration = {
  cache: false,
  devtool: false,
  mode: 'production',
  stats: 'errors-warnings',
  entry: {
    main: './src/app.tsx',
    version: './src/version.ts',
  },
  output: {
    clean: true,
    path: dir.dist,
    filename: `static/[name].${version}.js`,
    chunkFilename: `static/${version}/[name].js`,
    assetModuleFilename: 'assets/[name].[contenthash].[ext]',
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
    },
  },
  resolve: {
    tsConfigPath: dir.tsconfig,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'],
  },
};
type RspackPlugin =
  | 0
  | ''
  | null
  | false
  | undefined
  | RspackPluginInstance
  | RspackPluginFunction;

const { HtmlRspackPlugin, ProgressPlugin, DefinePlugin } = rspack;

export const iPlugins = (
  env: 'dev' | 'mock' | 'prod' | 'sit' = 'dev'
): RspackPlugin[] => [
  new HtmlRspackPlugin({
    title: app.name,
    publicPath: '/',
    favicon: './assets/favicon.svg',
    template: './assets/index.html',
    templateParameters: {
      title: app.name!,
      version: app.version!,
    },
  }),
  new DefinePlugin({
    'process.env': JSON.stringify(
      assign(
        process.env,
        parse(readFileSync(resolve(dir.env, 'common.env'))),
        parse(readFileSync(resolve(dir.env, 'dev.env')))
      )
    ),
  }),
  new ProgressPlugin(),
  new ForkTSCheckerWebpackPlugin() as unknown as null,
  env === 'dev' && new ReactRefreshRspackPlugin({}),
];

export default config;
