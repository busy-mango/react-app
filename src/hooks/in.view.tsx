import { useEffect } from 'react';

import { isHTMLElement, isTrue } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import type { ReactTargetType } from '@/models';
import { toHTMLElement } from '@/utils';

import useFrameState from './frame.state';

export function useInView(target?: ReactTargetType, enabled = true) {
  const element = toHTMLElement(target);

  const [isInView, setInView] = useFrameState(false);

  useEffect(() => {
    if (isTrue(enabled) && isHTMLElement(element)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === element) {
            setInView(entry.isIntersecting);
          }
        });
      });

      observer.observe(element);

      return () => {
        observer.unobserve(element);
        observer.disconnect();
      };
    }
  }, [element, enabled, setInView]);

  return ifnot(isTrue(enabled) && isInView);
}
