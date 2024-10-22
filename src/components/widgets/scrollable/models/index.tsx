import type { CSSProperties } from 'react';

import type { VirtualItem } from '@tanstack/react-virtual';

import type { ReactWrapProps } from '@/models';

export interface IScrollableProps<T> extends ReactWrapProps {
  gap?: number;
  /**
   * 是否测量元素高度（消耗性能，不建议开启）
   */
  measure?: boolean;
  /**
   * 选项
   */
  source?: T[];
  /**
   * 容器最大高度
   */
  maxHeight?: CSSProperties['maxHeight'];
  /**
   * 是否展示加载UI
   */
  isLoading?: boolean;
  /**
   * 选项渲染方法
   */
  render: (option: T, item: VirtualItem) => React.ReactNode;
}
