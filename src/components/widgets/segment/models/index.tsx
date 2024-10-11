import type { OmitOf } from '@busymango/utils';

import type { ReactButtonProps, ReactRender } from '@/models';

import type { ControlOption, ControlUISize } from '../../control';
import type { IFlexProps } from '../../flex';

export interface ISegmentState {
  /**
   * 将宽度调整为父元素宽度的选项
   */
  isFullWidth?: boolean;
  /**
   * 控件的值
   */
  value?: ControlOption['value'];
  /**
   * 控件尺寸
   */
  size?: ControlUISize;
}

export type ISegmentRootRender = ReactRender<
  OmitOf<IFlexProps, 'children'> & {
    segments: React.ReactNode;
  },
  ISegmentState
>;

export type ISegmentItemRender = ReactRender<
  ReactButtonProps & {
    onChange: (next: React.Key) => void;
  } & ControlOption,
  ISegmentState
>;

export interface ISegmentProps
  extends ISegmentState,
    OmitOf<IFlexProps, 'children' | 'defaultValue' | 'onChange'> {
  /**
   *
   */
  defaultValue?: ControlOption['value'];
  /**
   * 数据化配置选项内容
   */
  options?: ControlOption[];
  render?: {
    root?: ISegmentRootRender;
    item?: ISegmentItemRender;
  };
  /**
   * 选项变化时的回调函数
   */
  onChange?: (val: ControlOption['value']) => void;
}
