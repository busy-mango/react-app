/**
 * @description 断言工具函数
 */

import { Children, isValidElement } from 'react';

import {
  isEmptyArray,
  isFalse,
  isFinite,
  isHTMLElement,
  isNaN,
  isNil,
  isString,
} from '@busymango/is-esm';
import { or, parse } from '@busymango/utils';

import type { ReactTargetType } from '@/models';

import { catchMsg } from './catch';
import { toHTMLElement } from './react';

/**
 * 断言目标元素是否处于可滚动状态
 */
export function isScrollable(target?: ReactTargetType) {
  const element = toHTMLElement(target);
  if (isHTMLElement(element)) {
    const { scrollHeight, clientHeight } = element;
    return scrollHeight > clientHeight;
  }
}

/**
 * 断言目标变量为React子组件
 */
export function isReactChildren(source?: unknown) {
  return Children.count(source) > 0;
}

/**
 * 断言目标元素子元素是否溢出
 */
export function isOverflow(target?: ReactTargetType) {
  const element = toHTMLElement(target);
  if (isNil(element)) return false;
  const { offsetWidth, scrollWidth } = element;
  return offsetWidth < scrollWidth;
}

/**
 * 断言目标元素为ReactNode
 */
export function isReactNode(source: unknown): source is React.ReactNode {
  if (isFinite(source)) return true;
  if (isString(source)) return true;
  if (isValidElement(source)) return true;
  if (isNil(source) || isFalse(source)) return false;
  return isReactChildren(source);
}

/**
 * 断言是否资源404异常
 */
export function isNotFoundError(error: unknown) {
  return isLoadingChunkFailed(error) || isNotFoundModule(error);
}

/**
 * 断言是否资源404异常
 */
export function isNotFoundModule(error: unknown) {
  return catchMsg(error)?.startsWith('Cannot find module');
}

/**
 * 断言是否异步加载抛出的`Loading chunk ${route} failed`异常
 */
export function isLoadingChunkFailed(error: unknown): boolean {
  return /^Loading chunk.*failed$/.test(catchMsg(error) ?? '');
}

/**
 * 断言是否空字符串
 */
function isEmptyString(source: unknown) {
  return isString(source) && source.trim() === '';
}

/**
 * 断言是否空对象
 */
function isEmptyObject(source: unknown) {
  return parse.json(JSON.stringify(source)) === '{}';
}

/**
 * 断言是否空值
 * `''`, `NaN`, `{}`, `[]`, `null`, `undefined`均为空值
 */
export function isEmptyValue(source: unknown) {
  return or(
    [isNil, isNaN, isEmptyArray, isEmptyObject, isEmptyString],
    (assert) => assert(source)
  );
}
