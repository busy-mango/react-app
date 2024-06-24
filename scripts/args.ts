import { program } from 'commander';
import { dev, mock, prod, test } from 'config';

import type { Configuration } from '@rspack/core';

export const define = () => {
  const conf = { dev, mock, test, prod };

  const opts = program
    .option('-e, --env <char>', 'DevServer环境', 'dev')
    .option('-h, --host <char>', 'DevServer的域名', '0.0.0.0')
    .option('-p, --port <number>', 'DevServer的端口号', (8080).toString())
    .parse()
    .opts<{
      env: keyof typeof conf;
      port: string;
      host: string;
    }>();

  return { opts, config: conf[opts.env] as Configuration | undefined };
};
