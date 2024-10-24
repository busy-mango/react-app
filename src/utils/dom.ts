import { isHTMLElement } from '@busymango/is-esm';

import { isScrollable } from './assert';

/** 从ReactTargetType中找到最近的滚动容器 */
export function iScrollContainer(element: unknown): HTMLElement | undefined {
  if (isHTMLElement(element)) {
    const { parentElement } = element ?? {};
    if (isHTMLElement(parentElement)) {
      if (isScrollable(parentElement)) {
        return parentElement;
      }
      // 继续向上寻找滚动容器
      return iScrollContainer(parentElement);
    }
  }
}
