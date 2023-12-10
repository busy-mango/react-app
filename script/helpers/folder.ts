/**
 * @author 徐子梁
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
} from 'fs';
import { join } from 'path';

import { isFalse } from '@busymango/is-esm';

const options = { withFileTypes: true } as const;

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
