/**
 * @description 公共配置
 */

import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';

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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'],
    plugins: [new TsconfigPathsPlugin({ configFile: dir.tsconfig })],
  },
};

export default config;
