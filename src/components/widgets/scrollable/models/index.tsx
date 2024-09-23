import type { CSSProperties } from 'react';

import type { OmitOf } from '@busymango/utils';

import type { ReactRender, ReactWrapProps } from '@/models';

import type { ControlOption } from '../../control';

export interface ScrollableRef {
  native: HTMLDivElement;
  select: (index?: number, isSelected?: boolean) => void;
  active: (recipe: (current: number) => number) => void;
}

export interface ScrollableProps
  extends OmitOf<ReactWrapProps, 'onChange' | 'onSelect'> {
  /**
   * Whether the floating element has been positioned yet when used inside an Effect (not during render).
   */
  isPositioned: boolean;
  /**
   * 是否测量元素高度（消耗性能，不建议开启）
   */
  measure?: boolean;
  /**
   * 是否开启多选
   */
  multiple?: boolean;
  /**
   * 是否开启多选
   */
  options?: ControlOption[];
  /**
   * 选中的值
   */
  value?: React.Key[] | React.Key;
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
  render?: {
    option: ReactRender<
      ControlOption,
      {
        isActive: boolean;
        isSelected: boolean;
      }
    >;
  };
  /**
   * 选择菜单项时触发的回调。
   */
  onChange?: (value?: React.Key[] | React.Key) => void;
  /**
   * 点击选项时触发的回调
   */
  onSelect?: (index: number, value?: React.Key[]) => void;
}
