/**
 * @author 徐子梁
 * @description 公共请求头中间件
 */

import { DriveMiddleware } from '@busymango/fetch-driver';

const html = document.querySelector('html');

function theLanguage() {
  return html?.lang ?? 'zh-Hans-CN';
}

export const common: DriveMiddleware = async (context, next) => {
  const { headers } = context.options;

  headers.set('Accept-Language', theLanguage());

  await next();
};
