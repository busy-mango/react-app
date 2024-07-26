import { program } from 'commander';

import { dev, mock, prod, test } from '../config';

const conf = { dev, mock, test, prod };

type CCEnv = keyof typeof conf;

type CCProgOpts = {
  env: CCEnv;
  port: string;
  host: string;
};

export const define = (initial: Partial<CCProgOpts> = {}) => {
  const opts = program
    .option('-e, --env <char>', 'DevServer环境', initial.env ?? 'dev')
    .option('-h, --host <char>', 'DevServer的域名', initial.host ?? '0.0.0.0')
    .option('-p, --port <number>', 'DevServer的端口号', initial.port ?? '8080')
    .parse()
    .opts<CCProgOpts>();

  return { opts, config: conf[opts.env] };
};
