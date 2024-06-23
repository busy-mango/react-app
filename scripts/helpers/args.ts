import { program } from 'commander';

import type { Configuration } from '@rspack/core';

import dev from '../../config/compiler/develop.ts';
import mock from '../../config/compiler/mock.ts';
import prod from '../../config/compiler/product.ts';

export const define = () => {
  const conf = {
    dev,
    mock,
    prod,
  };

  type AppEnv = keyof typeof conf;

  const opts = program
    .option('-e, --env <char>', 'DevServer环境', 'dev')
    .option('-h, --host <char>', 'DevServer的域名', '0.0.0.0')
    .option('-p, --port <number>', 'DevServer的端口号', (8080).toString())
    .parse()
    .opts<{
      env: AppEnv;
      port: string;
      host: string;
    }>();

  return { opts, config: conf[opts.env] as Configuration | undefined };
};
