import { isHTMLElement } from '@busymango/is-esm';

import { isScrollable } from './assert';

/** 查询目标元素最近的滚动容器 */
export function queryScrollableParent(
  source?: unknown
): HTMLElement | undefined {
  if (isHTMLElement(source)) {
    const { parentElement } = source;
    if (isHTMLElement(parentElement)) {
      return !isScrollable(parentElement)
        ? queryScrollableParent(parentElement)
        : parentElement;
    }
  }
}
