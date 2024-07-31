import { program } from 'commander';

import { dev, prod, test } from '../config';

const configs = { dev, test, prod };

type CCEnv = keyof typeof configs;

type CCProgOpts = {
  env: CCEnv;
  port: string;
  host: string;
};

export const define = ({ env, host, port }: Partial<CCProgOpts> = {}) => {
  const opts = program
    .option('-e, --env <char>', 'DevServer环境', env ?? 'dev')
    .option('-h, --host <char>', 'DevServer的域名', host ?? '0.0.0.0')
    .option('-p, --port <number>', 'DevServer的端口号', port ?? '8080')
    .parse()
    .opts<CCProgOpts>();

  return { opts, config: configs[opts.env] };
};
