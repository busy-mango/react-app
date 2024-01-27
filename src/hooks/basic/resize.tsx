import { useEffect } from 'react';

import { isHTMLElement, isTrue } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import type { ReactTargetType, RectSize } from '@/models';
import { toHTMLElement } from '@/utils';

import useFrameState from './frame.state';

export function useResize(target: ReactTargetType, enabled = true) {
  const element = toHTMLElement(target);

  const [size, setSize] = useFrameState<RectSize | undefined>(() =>
    ifnot<RectSize>(
      isHTMLElement(element) && {
        width: element.clientWidth,
        height: element.clientHeight,
      }
    )
  );

  useEffect(() => {
    if (isTrue(enabled)) {
      !isHTMLElement(element) && setSize({ width: 0, height: 0 });

      if (isHTMLElement(element)) {
        const observer = new ResizeObserver((entries) => {
          entries.forEach(({ target }) => {
            if (target !== element) return;
            const { clientWidth, clientHeight } = target;
            setSize({ width: clientWidth, height: clientHeight });
          });
        });
        observer.observe(element);
        return () => {
          observer.disconnect();
        };
      }
    }
  }, [enabled, element, setSize]);

  return size;
}
