import type { ReactTargetType } from '@/models';
import { isHTMLElement } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import { toHTMLElement } from './react';

/** 获取路由父节点 */
export function findLocationParent(path?: string) {
  const source = path?.split('/').slice(0, -1);
  const condition = (source?.length ?? 0) >= 2;
  return ifnot(condition && source!.join('/'));
}

/** 获取最近的滚动容器 */
export function findScrollableParent(
  target: ReactTargetType
): HTMLElement | undefined {
  const element = toHTMLElement(target);
  const parent = element?.parentElement;
  if (!isHTMLElement(parent)) return undefined;
  const { scrollHeight, clientHeight } = parent;
  return ifnot(
    scrollHeight > clientHeight && parent,
    findScrollableParent(parent)
  );
}
