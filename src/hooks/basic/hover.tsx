import { useEffect } from 'react';

import { isHTMLElement } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';
import { toHTMLElement } from '@/utils';

import { useToggle } from './toggle';

export function useHover(target?: ReactTargetType) {
  const [hover, actions] = useToggle(false);

  useEffect(() => {
    const { on, off } = actions;
    const element = toHTMLElement(target);
    if (isHTMLElement(element)) {
      element.addEventListener('mouseenter', on);
      element.addEventListener('mouseleave', off);

      return () => {
        element.removeEventListener('mouseenter', on);
        element.removeEventListener('mouseleave', off);
      };
    }
  }, [target, actions]);

  return hover;
}
