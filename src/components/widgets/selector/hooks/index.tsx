import { useMemo } from 'react';

import { isObject, isTrue } from '@busymango/is-esm';
import { FRAME2MS } from '@busymango/utils';
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

import {
  iFocusParams,
  iHoverParams,
  useDebounceFunc,
  useEventState,
  useMemoFunc,
} from '@/hooks';
import { size2px } from '@/utils';

import type { ControlOption } from '../../control';
import type { ISignType } from '../../sign';
import { estimateSize } from '../helpers';
import type { ISelectorPredicate, ISelectorProps } from '../models';

export const useSignType = (
  context: FloatingContext<HTMLDivElement>,
  params: {
    clearable?: boolean;
  }
): ISignType => {
  const { clearable } = params;

  const { open, refs } = context;

  const current = refs.reference.current as HTMLDivElement;

  const isFocus = useEventState(iFocusParams(current));

  const isHover = useEventState(iHoverParams(current));

  const iArrow: ISignType = open ? 'arrowTop' : 'arrowBottom';

  const isShowClear = clearable && (isFocus || isHover || open);

  return isShowClear ? 'cross' : iArrow;
};

export const useIFloating = (params: {
  open?: boolean;
  onOpenChange?: (next?: boolean | undefined) => void;
}) => {
  const { open, onOpenChange } = params;

  const iSyncWidth = useDebounceFunc(
    (
      floating: HTMLElement,
      reference: {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    ) => {
      floating.style.width = `${reference.width}px`;
    },
    1 * FRAME2MS
  );

  const apply = useMemoFunc(
    ({
      rects: { reference },
      elements: { floating },
    }: MiddlewareState & {
      availableWidth: number;
      availableHeight: number;
    }) => {
      iSyncWidth.starer(floating, reference);
    }
  );

  return useFloating<HTMLDivElement>({
    open,
    transform: false,
    placement: 'bottom',
    middleware: [
      offset(size2px(2)),
      flip({ padding: size2px(2) }),
      size({ apply }),
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
    if (isObject(filter)) {
      return filter?.predicate;
    }
    if (isTrue(filter)) {
      return ({ title }: ControlOption, keyword?: string) => {
        return !keyword ? true : (title?.includes(keyword) ?? false);
      };
    }
  }, [filter]);

  return useMemo(() => {
    if (predicate) {
      return options?.filter((option) => {
        return predicate(option, keyword);
      });
    }
    return options;
  }, [predicate, keyword, options]);
};
