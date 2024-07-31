/**
 * @description 公共配置
 */

import type { Configuration } from '@rspack/core';

import { app, dir } from '../project';

const { version = '0.0.0' } = app;

const config: Configuration = {
  cache: false,
  devtool: false,
  mode: 'production',
  stats: 'errors-warnings',
  entry: './src/app.tsx',
  // https://github.com/web-infra-dev/rspack/issues/5110
  // entry: {
  //   main: './src/app.tsx',
  //   version: './src/version.ts',
  // },
  output: {
    clean: true,
    path: dir.dist,
    filename: `static/${version}/[name].js`,
    chunkFilename: `static/${version}/[name].js`,
    assetModuleFilename: 'assets/[name].[contenthash].[ext]',
  },
  experiments: {
    css: true,
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
  module: {
    parser: {
      'css/module': {
        namedExports: false,
      },
    },
    generator: {
      'css/module': {
        exportsOnly: false,
        exportsConvention: 'camel-case-only',
      },
    },
  },
  resolve: {
    tsConfig: dir.tsconfig,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'],
  },
};

export default config;
