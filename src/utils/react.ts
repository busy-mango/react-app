import type { ReactTargetType } from '@/models';
import { isFunction, isHTMLElement, isNull } from '@busymango/is-esm';

/** 转HTMLElement */
export function toHTMLElement(target?: ReactTargetType) {
  if (isNull(target)) return target;
  if (isHTMLElement(target)) return target;
  if (isFunction(target)) return toHTMLElement(target());
  return target?.current ?? null;
}

/** 防止冒泡 */
export function prevent(event?: React.UIEvent) {
  event?.stopPropagation();
  event?.preventDefault();
}

/** 创建回车事件 */
export const createPressEvent =
  (func?: (event?: React.KeyboardEvent) => void) =>
  (event?: React.KeyboardEvent) => {
    event?.code === 'Enter' && func?.(event);
  };
