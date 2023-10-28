#! /usr/bin/env ts-node

/**
 * @author 徐子梁
 * @description webpack build
 */

import fs from 'fs';
import date from 'dayjs';
import webpack from 'webpack';
import { resolve } from 'path';

import { dir } from '../config/index.ts';
import config from '../config/webpack/product.ts';

const time = () => date().format('YYYY-MM-DD HH:mm:ss');

const info = (message: string) => {
  console.info('>', '[webpack]', time(), message);
};

info('start build single page application');

(async function main() {
  webpack(config, (error, stats) => {
    if (error ?? stats?.hasErrors()) {
      throw new Error([
        'single page application failed to build',
        error?.message ?? stats?.toString(),
      ].join('\n'));
    }

    // 把themes文件夹copy到打包结果中
    info('copy themes to current dir');
    const target = resolve(dir.dist, 'themes');
    const origin = resolve(dir.static, 'themes');
    if (!fs.existsSync(target)) fs.mkdirSync(target);

    fs.readdirSync(origin).forEach((name) => {
      fs.copyFileSync(
        resolve(origin, name),
        resolve(target, name),
      );
    });

    info('single page application success to build');
  });
})();
