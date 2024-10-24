import type {
  MiddlewareState,
  Padding,
  UseFloatingOptions,
  UseFloatingReturn,
} from '@floating-ui/react';

import type { ReactTargetType } from '@/models';

import type { InteractionProps } from '../../control';

type FloatingOptions = Required<UseFloatingOptions>;

export type IPopoverRef = UseFloatingReturn['refs'];

export type IPopoverEvent = 'click' | 'focus' | 'hover';

export type IPopoverState = Pick<UseFloatingOptions, 'open' | 'placement'>;

export type IPopoverOpenChangeFunc = FloatingOptions['onOpenChange'];

export interface ApplyFloatingStyle {
  (
    params: MiddlewareState & {
      availableWidth: number;
      availableHeight: number;
    }
  ): Partial<CSSStyleDeclaration>;
}

export interface IPopoverProps
  extends Pick<
    UseFloatingOptions,
    'open' | 'onOpenChange' | 'placement' | 'transform'
  > {
  root?: ReactTargetType;
  content?: React.ReactNode;
  padding?: Padding;
  timing?: 'alway' | 'overflow';
  variant?: 'tooltip' | 'card' | 'confirm';
  trigger?: IPopoverEvent | IPopoverEvent[];
  onApplyFloatingStyle?: ApplyFloatingStyle;
  children?: (props: InteractionProps, state: IPopoverState) => React.ReactNode;
}
