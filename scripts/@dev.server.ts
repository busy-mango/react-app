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
import dev from '../config/webpack/develop.ts';
import { define, iUsablePort } from './helpers';

const { opts, config } = define();

const port = await iUsablePort(
  parseInt(opts.port),
  parseInt(opts.port) + 1000,
  opts.host
);

/**
 * 监听`browserslistrc`改动以生成对应正则
 * TODO: 放到 webpack plugin 中
 */
watch(dir.browserslistrc, () => {
  exec('pnpm caniuse');
});

const options: Configuration = {
  port,
  hot: true,
  https: false,
  compress: true,
  host: opts.host,
  allowedHosts: 'all',
  static: dir.static,
  watchFiles: dirconfs,
  historyApiFallback: true,
  server: { type: 'http' },
  client: { overlay: false },
  headers: { 'Access-Control-Allow-Origin': '*' },
};

const compiler = webpack(config ?? dev);

const server = new Server(options, compiler);

process.once('exit', () => {
  server.close();
});

server.start();
