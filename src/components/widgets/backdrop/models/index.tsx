import type { HTMLMotionProps } from 'framer-motion';

import type { ReactTargetType } from '@/models';

export interface IOverlayProps extends HTMLMotionProps<'div'> {
  /**
   * overlay will lock scrolling on the document body if is false.
   * @default false
   */
  scroll?: boolean;
}

export interface IBackdropProps extends IOverlayProps {
  open?: boolean;
  /**
   * 浮层默认渲染到 root 上，也可以使用此方法指定根节点。
   */
  root?: ReactTargetType;
}
