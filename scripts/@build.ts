#! /usr/bin/env tsx

import { hex } from 'ansis';
import dayjs from 'dayjs';

import { rspack } from '@rspack/core';

import { define } from './args';

const { config } = define({ env: 'prod' });

const time = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

const info = (message: string) => {
  console.info(
    [
      '<i>',
      hex('#0DD953')('[webpack]'),
      hex('#0DD953')(time()),
      hex('#0DD953')(message),
    ].join(' ')
  );
};

info('Start build single page application');

(async function main() {
  try {
    const start = dayjs();

    await new Promise((resolve, reject) => {
      rspack(config, (error, stats) => {
        if (error ?? stats?.hasErrors()) {
          reject(error ?? stats?.toString());
        } else {
          resolve(stats);
        }
      });
    });

    const finish = dayjs().diff(start, 'second');
    info(`Single page application success to build with ${finish}s`);
  } catch (error) {
    console.error(error);
  }
})();
