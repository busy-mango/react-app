import { type OmitOf } from '@busymango/utils';

import type { ControlUIPattern, ControlValue } from '@/components/models';
import type { ReactInputProps } from '@/models';

export interface IInputRef {
  clear: () => void;
  native: HTMLInputElement | null;
}

export interface IInputProps
  extends OmitOf<ReactInputProps, 'onChange' | 'value' | 'ref'> {
  /** 控件是否跟随文本宽度 */
  autoSize?: boolean;
  /** 控件值 */
  value?: ControlValue;
  /** 控件交互模式 */
  pattern?: ControlUIPattern;
  /** 输入事件 */
  onChange?: (value?: ControlValue) => void;
  /** 回车事件 */
  onPressEnter?: ReactInputProps['onKeyDown'];
}
