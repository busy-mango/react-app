import type { HTMLMotionProps } from 'motion/react';

import type { ReactRender, ReactWrapProps } from '@/models';

export type IPanelRender = ReactRender<
  React.PropsWithChildren<
    ReactWrapProps & {
      ref: React.RefObject<HTMLDivElement | null>;
    }
  >,
  never
>;

export interface IPanelProps extends HTMLMotionProps<'div'> {
  /** 展示内容 */
  visible?: boolean;
  /** 是否在内容卸载时留痕 */
  ghosting?: boolean;
  /** 自定义UI */
  render?: IPanelRender;
}
