/**
 * @author 徐子梁
 * @description once driver
 */

import FetchDriver from '@busymango/fetch-driver';

import { exception, common } from './middlewares';

const { drive, request } = new FetchDriver([
  common,
  exception,
]);

export { drive, request };
