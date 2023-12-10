#! /usr/bin/env ts-node

/**
 * @author 徐子梁
 * @description webpack-dev-server
 */

import { exec } from 'child_process';
import { watch } from 'fs';
import webpack from 'webpack';
import type { Configuration } from 'webpack-dev-server';
import Server from 'webpack-dev-server';

import { dir, dirconfs } from '../config/index.ts';
import config from '../config/webpack/develop.ts';

/**
 * 监听`browserslistrc`改动以生成对应正则
 * TODO: 放到 webpack plugin 中
 */
watch(dir.browserslistrc, () => {
  exec('pnpm browsers');
});

const options: Configuration = {
  port: 8080,
  https: false,
  compress: true,
  host: '0.0.0.0',
  allowedHosts: 'all',
  static: dir.static,
  hot: true,
  watchFiles: dirconfs,
  historyApiFallback: true,
  server: { type: 'http' },
  client: { overlay: false },
  headers: { 'Access-Control-Allow-Origin': '*' },
};

const compiler = webpack(config);

const server = new Server(options, compiler);

process.once('exit', () => {
  server.close();
});

server.start();
