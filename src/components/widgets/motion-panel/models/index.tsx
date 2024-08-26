import type { WrapperProps } from '@/models';

export interface IMotionPanelProps extends WrapperProps {
  /** 展示内容 */
  visible?: boolean;
  /** 容器样式 */
  wrapClassName?: string;
  /** 是否在内容卸载时留痕 */
  ghosting?: boolean;
}
