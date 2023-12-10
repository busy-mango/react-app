import { isValidElement } from 'react';

import type { ReactTargetType } from '@/models';
import { isArray, isFinite, isNil, isString } from '@busymango/is-esm';
import { or } from '@busymango/utils';

import { toHTMLElement } from './react';

export function isEmptyArray(source: unknown): source is [] {
  return isArray(source) && source.length === 0;
}

export function isOverflow(target?: ReactTargetType) {
  const element = toHTMLElement(target);
  if (isNil(element)) return false;
  const { offsetWidth, scrollWidth } = element;
  return offsetWidth < scrollWidth;
}

export function isReactNode(source: unknown): source is React.ReactNode {
  if (isFinite(source)) return true;
  if (isString(source)) return true;
  if (isValidElement(source)) return true;
  return false;
}

export function isNotFoundErrorMsg(msg?: string): boolean {
  const words = ['Cannot', 'Loading', 'module', 'chunk', 'not found'];
  return isString(msg) && or(words, (word) => msg?.includes(word));
}
