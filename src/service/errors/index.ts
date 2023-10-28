import { DriveContext } from '@busymango/fetch-driver';

import { catchMsg } from "@/utils";

/** 是否NG抛出的异常 */
export function isNginxError<T = unknown>(context: DriveContext<T>) {
  const { response, responseType } = context;
  const server = response?.headers?.get('server');
  return server?.includes('nginx') && responseType === 'html';
}

/** 是否页面发生404 */
export function isNotFoundPage(error?: unknown) {
  const msg = catchMsg(error);
  /** page not found */
  return msg?.startsWith('Cannot find module');
}
