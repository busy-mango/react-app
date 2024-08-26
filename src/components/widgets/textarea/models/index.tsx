import type { OmitOf } from '@busymango/utils';

import type { ControlPattern } from '../../control';

type ValueType = string | number | readonly string[] | undefined;

export type ITextareaRef = React.RefObject<HTMLTextAreaElement>;

export type ITextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface ITextAreaProps
  extends OmitOf<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'children' | 'rows' | 'onChange'
  > {
  // ref?: React.Ref<HTMLTextAreaElement>;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: number;

  onChange?: (value: ValueType) => void;

  pattern?: ControlPattern;
}
