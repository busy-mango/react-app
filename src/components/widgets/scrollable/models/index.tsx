import type { CSSProperties } from 'react';

import type { PlainObject } from '@busymango/is-esm';

import type { ReactRender, ReactWrapProps } from '@/models';

import type { ControlOption } from '../../control';
import type { IEmptyWrapProps } from '../../empty';

export type IScrollableEmptyRender = ReactRender<IEmptyWrapProps, PlainObject>;

export type IScrollableOptionRender = ReactRender<
  ControlOption,
  {
    index: number;
    isActive: boolean;
    isSelected: boolean;
  }
>;

export interface ScrollableRef {
  native: HTMLDivElement;
  select: (index?: number, isSelected?: boolean) => void;
  active: (recipe: (current: number) => number) => void;
}

export interface ScrollableChangeFunc {
  (value?: React.Key[] | React.Key): void;
}

export interface ScrollableSelectFunc {
  (index: number, value?: React.Key[]): void;
}

export interface ScrollableProps extends ReactWrapProps {
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
   * 选项
   */
  options?: ControlOption[];
  /**
   * 选中的值
   */
  value?: React.Key[] | React.Key | null;
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
    empty?: IScrollableEmptyRender;
    option: IScrollableOptionRender;
  };
  /**
   * 选择菜单项时触发的回调。
   */
  onChange?: ScrollableChangeFunc;
  /**
   * 点击选项时触发的回调
   */
  onSelect?: ScrollableSelectFunc;
}
