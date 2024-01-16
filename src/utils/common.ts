import { isArray, isHTMLElement } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';

import { isScrollable } from './assert';
import { toHTMLElement } from './react';

export type WrapperDirectionType = 'inline' | 'vertical' | 'horizontal';

export function toArray<T = unknown>(source: T[] | T) {
  return isArray(source) ? source : [source];
}

export function stopPropagation(event?: React.UIEvent) {
  event?.stopPropagation();
  event?.preventDefault();
}

export function queryScrollContainer(
  target: ReactTargetType
): HTMLElement | undefined {
  const element = toHTMLElement(target);
  const { parentElement } = element ?? {};
  if (isHTMLElement(parentElement)) {
    return isScrollable(parentElement)
      ? parentElement
      : queryScrollContainer(parentElement);
  }
}
