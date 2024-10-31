import { type OmitOf } from '@busymango/utils';

import type { ReactInputProps } from '@/models';

import type { ControlPattern } from '../../control';

export interface IInputProps
  extends OmitOf<ReactInputProps, 'value' | 'width' | 'size'> {
  /** 控件宽度 */
  width?: React.CSSProperties['width'];
  /** 控件值 */
  value?: ReactInputProps['value'] | null;
  /** 控件交互模式 */
  pattern?: ControlPattern;
  /** 回车事件 */
  onPressEnter?: ReactInputProps['onKeyDown'];
}
