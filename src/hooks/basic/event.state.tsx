import { useEffect } from 'react';

import { isHTMLElement } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

import { useToggle } from './toggle';

export function useEventState(
  params: {
    start: keyof HTMLElementEventMap;
    end: keyof HTMLElementEventMap;
    target?: ReactTargetType;
  } & AddEventListenerOptions
) {
  const { end, start, target, passive = true, capture } = params ?? {};

  const [state, { on, off }] = useToggle(false);

  useEffect(() => {
    const element = iFindElement(target);

    if (isHTMLElement(element)) {
      const options = { passive, capture };
      element.addEventListener(end, off, options);
      element.addEventListener(start, on, options);

      return () => {
        element.removeEventListener(end, off);
        element.removeEventListener(start, on);
      };
    }
  }, [target, on, off, end, start, passive, capture]);

  return state;
}
