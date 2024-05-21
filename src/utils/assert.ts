/**
 * @description 断言工具函数
 */

import { Children, isValidElement } from 'react';

import {
  isFalse,
  isFinite,
  isHTMLElement,
  isNil,
  isString,
} from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';

import { catchMsg } from './catch';
import { iFindElement } from './react';

/**
 * 判断当前UserAgent是否移动端
 */
export function isMobile(ua: string = navigator.userAgent.toLowerCase()) {
  return /Mobile\/\w+/.test(ua);
}

/**
 * 判断当前UserAgent是否IOS系统
 */
export function isIOS(ua: string = navigator.userAgent.toLowerCase()): boolean {
  return /iP(hone|ad|od)|iOS/.test(ua);
}

/**
 * 断言目标元素是否处于可滚动状态
 */
export function isScrollable(target?: ReactTargetType) {
  const element = iFindElement(target);
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
export function isOverflow(target?: ReactTargetType, tolerance = 2) {
  const element = iFindElement(target);
  if (isNil(element)) return false;
  const { offsetWidth, scrollWidth, offsetHeight, scrollHeight } = element;
  console.log(offsetHeight, scrollHeight);
  return (
    offsetWidth + tolerance < scrollWidth ||
    offsetHeight + tolerance < scrollHeight
  );
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
