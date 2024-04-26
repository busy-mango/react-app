import { isFunction, isHTMLElement, isNull, isTrue } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';

/** 从ReactTargetType中获取HTMLElement */
export function iFindElement(target?: ReactTargetType) {
  if (isNull(target)) return target;
  if (isHTMLElement(target)) return target;
  if (isFunction(target)) return iFindElement(target());
  return target?.current ?? null;
}

/** 防止冒泡 */
export function iPropagation(event?: React.UIEvent, stop = true) {
  if (isTrue(stop)) {
    event?.stopPropagation();
    event?.preventDefault();
  }
}

/** 从键盘敲击事件中创建回车敲击事件 */
export const iPressEvent =
  <T extends Element = Element>(
    func?: (event: React.KeyboardEvent<T>) => void,
    onKeyDown?: (event: React.KeyboardEvent<T>) => void
  ) =>
  (event: React.KeyboardEvent<T>) => {
    event?.code === 'Enter' ? func?.(event) : onKeyDown?.(event);
  };

/** 从滚动事件中创建滚动到底部的事件回调 */
export const iScrollBottomEvent =
  (callback: React.UIEventHandler) => (event: React.UIEvent) => {
    const tolerance = 2;
    const { target } = event;
    if (isHTMLElement(target)) {
      const { scrollTop, scrollHeight, offsetHeight } = target;
      const offset = scrollTop + offsetHeight - scrollHeight;
      Math.abs(offset) <= tolerance && callback(event);
    }
  };
