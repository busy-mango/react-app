/**
 * @description fs helpers
 */

import {
  accessSync,
  constants,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'fs';
import { join, resolve } from 'path';

import { isFalse } from '@busymango/is-esm';

const options = { withFileTypes: true } as const;

/**
 * copy文件
 */
export const copy = (source: string, target: string) => {
  if (!existsSync(source)) {
    throw new Error('source is not exists');
  }

  isFalse(existsSync(target)) && mkdirSync(target);

  for (const iterator of readdirSync(source, options)) {
    const reader = join(source, iterator.name);
    const writer = join(target, iterator.name);

    if (iterator.isFile()) {
      createReadStream(reader).pipe(createWriteStream(writer));
    } else {
      try {
        accessSync(join(writer, '..'), constants.W_OK);
        copy(reader, writer);
      } catch (error) {
        console.warn(error);
      }
    }
  }
};

/**
 * 递归获取目标路径下所有文件的路径
 */
export function expands(dirpath?: string): string[] {
  if (!dirpath) return [];
  const names = readdirSync(dirpath);
  return names.flatMap((name) => {
    const cur = resolve(dirpath, name);
    const isDirectory = statSync(cur).isDirectory();
    return isDirectory ? expands(cur) : cur;
  });
}
