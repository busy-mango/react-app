import mime from 'mime';

import {
  downloader,
  type DriveMiddleware,
  src2name,
  toParams,
} from '@busymango/fetch-driver';
import { isBlob, isTrue } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

const type = mime.getType('bin')!;

export const attachment: DriveMiddleware = async (context, next) => {
  await next();

  const { api, response } = context;

  const { ok, headers } = response ?? {};

  if (isTrue(ok) && headers?.has('Content-Disposition')) {
    const current = headers.get('Content-Disposition')?.trim();
    const [mode, ...attrList] = current?.split(';') ?? [];

    if (mode?.trim() === 'attachment') {
      const { receivedChunk: chunk } = context;

      context.body = ifnot(
        chunk && new Blob([chunk], { type }),
        await response?.blob()
      );

      if (isBlob(context.body)) {
        const params = toParams(attrList);
        const name = params.get('filename');
        const src = URL.createObjectURL(context.body);
        downloader(src, name ?? src2name(api));
      }
    }
  }
};
