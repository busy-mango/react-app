import type { OmitOf } from '@busymango/utils';

import type { ControlOption, ControlPattern } from '../../control';
import type { IFlexProps } from '../../flex';

export interface ISegmentProps extends OmitOf<IFlexProps, 'children'> {
  /**
   * 将宽度调整为父元素宽度的选项
   */
  isFullWidth?: boolean;
  /**
   *
   */
  defaultValue?: ControlOption['value'];
  /**
   *
   */
  value?: ControlOption['value'];

  /**
   * 数据化配置选项内容
   */
  options?: ControlOption[];

  // size	控件尺寸	large | middle | small	middle

  pattern?: ControlPattern;

  /**
   * 选项变化时的回调函数
   */
  onChange?: (val: ControlOption['value']) => void;
}
