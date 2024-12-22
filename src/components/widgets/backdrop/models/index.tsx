import type { HTMLMotionProps } from 'motion/react';

import type { OmitOf } from '@busymango/utils';
import type { FloatingPortalProps } from '@floating-ui/react';

import type { ReactTargetType } from '@/models';

export interface IOverlayProps extends HTMLMotionProps<'div'> {
  /**
   * overlay will lock scrolling on the document body if is false.
   * @default false
   */
  scroll?: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

export interface IBackdropProps
  extends IOverlayProps,
    OmitOf<FloatingPortalProps, 'children' | 'root'> {
  root?: ReactTargetType;
  relative?: boolean;
  open?: boolean;
}
