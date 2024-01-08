/**
 * @description 公共请求头中间件
 */

import type { DriveMiddleware } from '@busymango/fetch-driver';
import { isFalse, isUndefined } from '@busymango/is-esm';

const html = document.querySelector('html');

function theLanguage() {
  return html?.lang ?? 'zh-Hans-CN';
}

export const common: DriveMiddleware = async (context, next) => {
  const { headers, credentials } = context.options;

  if (isUndefined(credentials)) {
    context.options.credentials = 'same-origin';
  }

  if (isFalse(headers.has('Accept-Language'))) {
    headers.set('Accept-Language', theLanguage());
  }

  await next();
};
