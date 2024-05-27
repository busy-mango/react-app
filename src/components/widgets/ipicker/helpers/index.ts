import { compact } from '@busymango/utils';

import type { ControlOptionModel } from '@/components/models';
import type { ReactTargetType } from '@/models';
import { iFindElement } from '@/utils';

export const DATA_ID_NAME = 'data-picker-id';

export const identified = (
  value: ControlOptionModel['value'],
  index: number
) => {
  return compact([value, index.toString()]).join('-');
};

export const iScrollIntoView = (target?: ReactTargetType) => {
  iFindElement(target)?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

export const iWrapExit = { scaleY: 0.04, opacity: 0.04 };

export const iWrapInitial = { scaleY: 0.36, opacity: 0.64 };

export const iWrapAnimate = { scaleY: 1, opacity: 1 };

export const iDismissProps = { outsidePressEvent: 'mousedown' } as const;
