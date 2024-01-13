import { isFunction, isHTMLElement, isNull, isTrue } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';

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
  <T extends Element = Element>(
    func?: (event: React.KeyboardEvent<T>) => void,
    onKeyDown?: (event: React.KeyboardEvent<T>) => void
  ) =>
  (event: React.KeyboardEvent<T>) => {
    event?.code === 'Enter' ? func?.(event) : onKeyDown?.(event);
  };
