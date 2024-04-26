import { compact } from '@busymango/utils';

import { sizeOf } from '@/utils';

/** 获取上一级面包屑 */
export const findParentCrumbs = (route?: string) => {
  const source = compact(route?.split('/').slice(0, -1) ?? []);
  return sizeOf(source) >= 2 ? source?.join('/') : undefined;
};
