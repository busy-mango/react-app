import { type OmitOf } from '@busymango/utils';

import type { ReactInputProps } from '@/models';

import type { ControlPattern, ControlValue } from '../../control';

export interface IInputRef {
  clear: () => void;
  native: HTMLInputElement | null;
}

export interface IInputProps extends OmitOf<ReactInputProps, 'value' | 'ref'> {
  /** 控件是否跟随文本宽度 */
  autoSize?: boolean;
  /** 控件值 */
  value?: ControlValue;
  /** 控件交互模式 */
  pattern?: ControlPattern;
  /** 回车事件 */
  onPressEnter?: ReactInputProps['onKeyDown'];
}
