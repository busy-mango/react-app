#! /usr/bin/env tsx

import { exec } from 'child_process';
import { dev, dir, dirconfs } from 'config';
import { watch } from 'fs';
import { iUsablePort } from 'helpers';

import { rspack } from '@rspack/core';
import type { Configuration } from '@rspack/dev-server';
import { RspackDevServer } from '@rspack/dev-server';

import { define } from './args.ts';

const { opts, config } = define();

const port = await iUsablePort(
  parseInt(opts.port, 10),
  parseInt(opts.port, 10) + 1000,
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

const compiler = rspack(config ?? dev);

const server = new RspackDevServer(options, compiler);

process.once('exit', () => {
  server.close();
});

server.start();
