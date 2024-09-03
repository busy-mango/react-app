import type { PartialPick } from '@busymango/utils';

import type { ControlOption, ControlPattern } from '../../control';
import type { IRadioProps } from '../../radio';

export interface IRadioGroupProps
  extends PartialPick<
    IRadioProps,
    'direction' | 'render' | 'variant' | 'size' | 'name'
  > {
  /**
   * 控件交互模式
   */
  pattern?: ControlPattern;
  /**
   * 选项
   */
  options?: ControlOption[];
  /**
   * 选中的值
   */
  value?: ControlOption['value'];
  /**
   * 默认选中的值
   */
  defaultValue?: ControlOption['value'];
  /**
   * 选中事件
   */
  onChange?: (
    value?: ControlOption['value'] | null,
    option?: ControlOption
  ) => void;
}
