/**
 * @author 徐子梁
 * @description 通用配置
 */

import type { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import { dir } from '../index.ts';

const config: Configuration = {
  devtool: false,
  mode: 'production',
  entry: {
    main: './src/~app.tsx',
  },
  performance: {
    hints: false,
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'async',
      // cacheGroups: {
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: ({ context }: { context: string | null }) => {
      //       const regexp = /[\\/]node_modules[\\/](.*?)([\\/]|$)/;
      //       const [name] = context?.match?.(regexp) ?? [];
      //       return name?.replace('/node_modules/', 'vendor/');
      //     },
      //   },
      // },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'],
    plugins: [new TsconfigPathsPlugin({ configFile: dir.tsconfig })],
  },
};

export default config;
