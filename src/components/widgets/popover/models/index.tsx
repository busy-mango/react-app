import type {
  MiddlewareState,
  ReferenceType,
  UseFloatingOptions,
} from '@floating-ui/react';

import type { ReactRender, ReactTargetType, ReactWrapProps } from '@/models';

import type { InteractionProps } from '../../control';

type FloatingOptions = Required<
  Pick<UseFloatingOptions, 'open' | 'onOpenChange' | 'placement' | 'transform'>
>;

export type IPopoverRef = {
  reference: React.RefObject<ReferenceType | null>;
  floating: React.RefObject<HTMLElement | null>;
  setReference: (node: ReferenceType | null) => void;
  setFloating: (node: HTMLElement | null) => void;
};

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
  ref?: React.RefObject<IPopoverRef>;
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

export type MiddlewareOpts = {
  iArrow: React.RefObject<SVGSVGElement | null>;
  onApplyFloatingStyle?: ApplyFloatingStyle;
} & Pick<IPopoverProps, 'variant' | 'root'>;
