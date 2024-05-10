import type { WrapperProps } from '@/models';

/** 反馈方式 */
export type FeedbackStatus = 'error' | 'warning' | 'success' | 'waiting';

export interface FeedbackProps extends WrapperProps {
  /** 反馈方式（消息状态） */
  status?: FeedbackStatus;
  /** 容器样式 */
  wrapClassName?: string;
}
