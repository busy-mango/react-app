import { useEffect } from 'react';

import { isHTMLElement } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

export function useResizeObserver(
  target: ReactTargetType,
  func: (e: HTMLElement) => void,
  enabled = true
) {
  useEffect(() => {
    const element = iFindElement(target);

    if (enabled && isHTMLElement(element)) {
      const observer = new ResizeObserver((entries) => {
        const current = entries.find(({ target }) => target === element);
        current?.target && func(current.target as HTMLElement);
      });

      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [target, enabled, func]);
}
