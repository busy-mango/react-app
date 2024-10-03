import type { HTMLMotionProps } from 'framer-motion';

import type { OmitOf } from '@busymango/utils';
import type { FloatingPortalProps } from '@floating-ui/react';

export interface IOverlayProps extends HTMLMotionProps<'div'> {
  /**
   * overlay will lock scrolling on the document body if is false.
   * @default false
   */
  scroll?: boolean;
}

export interface IBackdropProps
  extends IOverlayProps,
    OmitOf<FloatingPortalProps, 'children'> {
  open?: boolean;
}
