import { useEffect, useMemo } from 'react';

import type { ReactTargetType, RectSize } from '@/models';
import { toHTMLElement } from '@/utils';
import { isHTMLElement } from '@busymango/is-esm';
import { ifnot } from '@busymango/utils';

import useFrameState from './frame.state';

export function useResize(target: ReactTargetType, enabled: boolean) {
  const element = useMemo(() => toHTMLElement(target), [target]);

  const [size, setSize] = useFrameState<RectSize | undefined>(() =>
    ifnot<RectSize>(
      isHTMLElement(element) && {
        width: element.clientWidth,
        height: element.clientHeight,
      }
    )
  );

  useEffect(() => {
    if (enabled && isHTMLElement(element)) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const { clientWidth, clientHeight } = target;
          setSize({ width: clientWidth, height: clientHeight });
        });
      });
      observer.observe(element);
      return observer.disconnect;
    }
  }, [enabled, element, setSize]);

  return size;
}
