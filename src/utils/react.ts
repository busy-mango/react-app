import type { ReactTargetType } from '@/models';
import { isFunction, isHTMLElement, isNull, isTrue } from '@busymango/is-esm';

/** 转HTMLElement */
export function toHTMLElement(target?: ReactTargetType) {
  if (isNull(target)) return target;
  if (isHTMLElement(target)) return target;
  if (isFunction(target)) return toHTMLElement(target());
  return target?.current ?? null;
}

/** 防止冒泡 */
export function propagation(event?: React.UIEvent, stop = true) {
  if (isTrue(stop)) {
    event?.stopPropagation();
    event?.preventDefault();
  }
}

/** 创建回车事件 */
export const createPressEvent =
  (func?: (event?: React.KeyboardEvent) => void) =>
  (event?: React.KeyboardEvent) => {
    event?.code === 'Enter' && func?.(event);
  };
