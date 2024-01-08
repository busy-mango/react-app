import { compact, ifnot } from '@busymango/utils';

/** 获取上一级面包屑 */
export function toParentCrumbs(route?: string) {
  const source = compact(route?.split('/').slice(0, -1) ?? []);
  return ifnot((source?.length ?? 0) > 2 && source.join('/'));
}
