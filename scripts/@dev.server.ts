#! /usr/bin/env ts-node

/**
 * @description webpack-dev-server
 */

import { exec } from 'child_process';
import { watch } from 'fs';
import webpack from 'webpack';
import type { Configuration } from 'webpack-dev-server';
import Server from 'webpack-dev-server';

import { dir, dirconfs } from '../config/index.ts';
import develop from '../config/webpack/develop.ts';
import { toWebpackConfig } from './helpers';

/**
 * 监听`browserslistrc`改动以生成对应正则
 * TODO: 放到 webpack plugin 中
 */
watch(dir.browserslistrc, () => {
  exec('pnpm caniuse');
});

const options: Configuration = {
  hot: true,
  port: 8080,
  https: false,
  compress: true,
  host: '0.0.0.0',
  allowedHosts: 'all',
  static: dir.static,
  watchFiles: dirconfs,
  historyApiFallback: true,
  server: { type: 'http' },
  client: { overlay: false },
  headers: { 'Access-Control-Allow-Origin': '*' },
};

const compiler = webpack(toWebpackConfig() ?? develop);

const server = new Server(options, compiler);

process.once('exit', () => {
  server.close();
});

server.start();
