import { useMemo } from 'react';
import { flushSync } from 'react-dom';

import { isObject, isTrue } from '@busymango/is-esm';
import type { FloatingContext, MiddlewareState } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

import { useDebounceFunc, useMemoFunc } from '@/hooks';
import { size2px } from '@/utils';

import type { ControlOption } from '../../control';
import { estimateSize } from '../../scrollable';
import { iPredicate } from '../helpers';
import type { ISelectorPredicate, ISelectorProps } from '../models';

export const useIFloating = (params: {
  open?: boolean;
  onOpenChange?: (next?: boolean | undefined) => void;
}) => {
  const { open, onOpenChange } = params;

  const sync = useDebounceFunc(
    ({ rect, floating }: { floating: HTMLElement; rect: DOMRect }) => {
      flushSync(() => {
        floating.style.width = `${rect.width}px`;
      });
    }
  );

  const apply = useMemoFunc(
    ({
      elements: { floating, reference },
    }: MiddlewareState & {
      availableWidth: number;
      availableHeight: number;
    }) => {
      const rect = reference.getBoundingClientRect();
      sync.starer({ floating, rect: rect as DOMRect });
      if (floating.getAttribute('data-resize') !== 'true') {
        floating.setAttribute('data-resize', 'true');
        sync.flush();
      }
    }
  );

  const padding = size2px(2);

  return useFloating<HTMLDivElement>({
    open,
    transform: false,
    placement: 'bottom',
    middleware: [
      offset(size2px(2)),
      flip({ padding }),
      size({ apply, padding }),
    ],
    onOpenChange,
    whileElementsMounted: autoUpdate,
  });
};

export const useIInteractions = (context: FloatingContext) => {
  const click = useClick(context, { toggle: false });

  const dismiss = useDismiss(context, {
    referencePressEvent: 'click',
    referencePress: false,
  });

  return useInteractions([click, dismiss]);
};

export const useIMotion = (context: FloatingContext) => {
  const isTop = context.placement.startsWith('top');

  const transition = useMemo(
    () => ({
      duration: 0.15,
      ease: 'easeOut',
      originY: isTop ? 1 : 0,
    }),
    [isTop]
  );

  const initial = useMemo(
    () => ({
      opacity: 0,
      scaleY: 0.96,
      y: (isTop ? 0.25 : -0.25) * estimateSize(),
    }),
    [isTop]
  );

  return { transition, initial };
};

export const useFilterOptions = (
  options?: ControlOption[],
  params: {
    filter?: ISelectorProps['filter'];
    keyword?: string;
  } = {}
) => {
  const { filter, keyword } = params;

  const predicate = useMemo<ISelectorPredicate | undefined>(() => {
    if (isTrue(filter)) return iPredicate;
    if (isObject(filter)) return filter?.predicate;
  }, [filter]);

  return useMemo(() => {
    if (!predicate) return options;
    return options?.filter((option) => {
      return predicate(option, keyword);
    });
  }, [predicate, keyword, options]);
};
