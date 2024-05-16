import { useEffect } from 'react';

import { isHTMLElement } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

import { useToggle } from './toggle';

export function useEventState(params: {
  start: keyof HTMLElementEventMap;
  end: keyof HTMLElementEventMap;
  target?: ReactTargetType;
}) {
  const { end, start, target } = params ?? {};

  const [state, { on, off }] = useToggle(false);

  useEffect(() => {
    const element = iFindElement(target);

    if (isHTMLElement(element)) {
      element.addEventListener(end, off);
      element.addEventListener(start, on);

      return () => {
        element.removeEventListener(end, off);
        element.removeEventListener(start, on);
      };
    }
  }, [target, on, off, end, start]);

  return state;
}
