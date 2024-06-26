import { flushSync } from 'react-dom';

import type { MiddlewareState } from '@floating-ui/react';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react';

import { useMemoFunc } from '@/hooks';
import { size2px } from '@/utils';

import type { ISignType } from '../../isign';

export const useSignType = (
  clearable?: boolean,
  isFocus?: boolean,
  open?: boolean
): ISignType => {
  const iArrow: ISignType = open ? 'arrow-top' : 'arrow-bottom';

  const isShowClear = clearable && (isFocus || open);

  return isShowClear ? 'cross' : iArrow;
};

export const useIFloating = (params: {
  open?: boolean;
  onOpenChange?: (next?: boolean | undefined) => void;
}) => {
  const { open, onOpenChange } = params;

  const apply = useMemoFunc(
    ({
      rects: { reference },
      elements: { floating },
    }: MiddlewareState & {
      availableWidth: number;
      availableHeight: number;
    }) => {
      flushSync(() => {
        floating.style.width = `${reference.width}px`;
      });
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
