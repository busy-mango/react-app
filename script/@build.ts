#! /usr/bin/env ts-node

/**
 * @description webpack build
 */

import date from 'dayjs';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import webpack from 'webpack';

import { dir } from '../config/index.ts';
import config from '../config/webpack/product.ts';
import { copy } from './helpers/folder.ts';

const time = () => date().format('YYYY-MM-DD HH:mm:ss');

const info = (message: string) => {
  console.info('>', '[webpack]', time(), message);
};

info('Start build single page application');

(async function main() {
  webpack(config, (error, stats) => {
    if (error ?? stats?.hasErrors()) {
      info('Single page application failed to build');
      throw new Error(error?.message ?? stats?.toString());
    }

    // 把`assets`下的文件夹复制到`dist`中
    readdirSync(dir.static, {
      withFileTypes: true,
    }).forEach((dirent) => {
      const { name } = dirent;
      if (dirent.isDirectory()) {
        copy(resolve(dir.static, name), resolve(dir.dist, name));
        info(`Copy ${name} to current dir success`);
      }
    });

    info('Single page application success to build');
  });
})();
