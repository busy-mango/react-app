import { useEffect } from 'react';

import { isFunction, isHTMLElement } from '@busymango/is-esm';
import { debounce } from '@busymango/utils';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

export type ResizeObserverOpts = {
  enabled?: boolean;
  debounce?: number;
};

export function useResizeObserver(
  target?: ReactTargetType,
  func?: (e: HTMLElement) => void,
  params: ResizeObserverOpts = {}
) {
  const { enabled = true, debounce: wait } = params;
  useEffect(() => {
    const element = iFindElement(target);

    if (enabled && isFunction(func) && isHTMLElement(element)) {
      const callback = wait ? debounce(func, wait).starer : func;

      const observer = new ResizeObserver((entries) => {
        const current = entries.find(({ target }) => target === element);
        current?.target && callback(current.target as HTMLElement);
      });

      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [target, enabled, wait, func]);
}
