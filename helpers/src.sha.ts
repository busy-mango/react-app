import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

import { isEmptyString } from '@busymango/is-esm';

const exec = (cmd: string) => execSync(cmd, { encoding: 'utf8' }).trim();

export const iGitSHA = () => {
  // 工作区和暂存区都是干净的CommitID才是有效的
  if (isEmptyString(exec('git status --porcelain'))) {
    return exec('git rev-parse HEAD');
  }
};

export const iCalcSHA = (paths: string[]): string => {
  const hash = createHash('sha256');

  paths.forEach((path) => {
    const stat = statSync(path);
    if (stat.isFile()) {
      hash.update(readFileSync(path));
    }
    if (stat.isDirectory()) {
      const names = readdirSync(path);
      hash.update(iCalcSHA(names.map((name) => join(path, name))));
    }
  });

  return hash.digest('hex');
};
