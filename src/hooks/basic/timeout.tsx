import { useEffect } from 'react';

import type { ConstrainedFunc } from '@busymango/utils';

export const useTimeout = <T extends ConstrainedFunc<T>>(
  func?: T,
  params?: {
    wait?: number;
    enabled?: boolean;
  }
) => {
  const { enabled, wait } = params ?? {};

  useEffect(() => {
    if (enabled && func) {
      const timer = setTimeout(func, wait);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [enabled, wait, func]);
};
