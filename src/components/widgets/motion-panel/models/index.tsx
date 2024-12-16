import type { HTMLMotionProps } from 'motion/react';

import type { ReactRender, ReactWrapProps } from '@/models';

export type IMotionPanelRender = ReactRender<
  React.PropsWithChildren<
    ReactWrapProps & {
      ref: React.RefObject<HTMLDivElement | null>;
    }
  >,
  { record?: React.ReactNode }
>;

export interface IMotionPanelProps extends HTMLMotionProps<'div'> {
  /** 展示内容 */
  visible?: boolean;
  /** 是否在内容卸载时留痕 */
  ghosting?: boolean;
  /** 自定义UI */
  render?: IMotionPanelRender;
}
