/**
 * @description 异常处理中间件
 */

import type { DriveMiddleware } from '@busymango/fetch-driver';
import { FetchError } from '@busymango/fetch-driver';
import { isTrue } from '@busymango/is-esm';

export const exception: DriveMiddleware = async (context, next) => {
  await next();

  const { api, response, body } = context;

  if (!response) {
    throw new FetchError('服务端失去响应', { context });
  }

  const { ok, status, headers } = response;

  if (status === 401) {
    throw new FetchError('登录态已过期', { context });
  }

  if (status === 405) {
    const { method } = context.options;
    const instruction = `[${method}@${api}]`;
    throw new FetchError(`请求方式异常: ${instruction}`, { context });
  }

  if (status === 503 || status === 504) {
    throw new FetchError('服务端维护中', { context });
  }

  if (!isTrue(ok)) {
    console.dir(body);
    console.info(headers);
    throw new FetchError('网络异常', { context });
  }
};
