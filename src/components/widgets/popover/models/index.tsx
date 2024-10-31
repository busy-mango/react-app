import type {
  MiddlewareState,
  UseFloatingOptions,
  UseFloatingReturn,
} from '@floating-ui/react';

import type { ReactRender, ReactTargetType, ReactWrapProps } from '@/models';

import type { InteractionProps } from '../../control';

type FloatingOptions = Required<
  Pick<UseFloatingOptions, 'open' | 'onOpenChange' | 'placement' | 'transform'>
>;

export type IPopoverRef = UseFloatingReturn['refs'];

export type IPopoverEvent = 'click' | 'focus' | 'hover';

export type IPopoverState = Pick<FloatingOptions, 'open' | 'placement'>;

export type IPopoverOpenChangeFunc = FloatingOptions['onOpenChange'];

export type IPopoverReferenceRender = ReactRender<
  React.PropsWithChildren<InteractionProps>,
  IPopoverState
>;

export interface ApplyFloatingStyle {
  (
    params: MiddlewareState & {
      availableWidth: number;
      availableHeight: number;
    }
  ): Partial<CSSStyleDeclaration>;
}

export interface IPopoverProps
  extends ReactWrapProps,
    React.PropsWithChildren,
    Partial<FloatingOptions> {
  root?: ReactTargetType;
  content?: React.ReactNode;
  timing?: 'alway' | 'overflow';
  variant?: 'tooltip' | 'card' | 'confirm';
  trigger?: IPopoverEvent | IPopoverEvent[];
  onApplyFloatingStyle?: ApplyFloatingStyle;
  render?: {
    reference?: IPopoverReferenceRender;
  };
}
