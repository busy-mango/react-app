import type { HTMLMotionProps } from 'framer-motion';

import type { PlainObject } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';

import type { WrapperProps } from '@/models';

import type {
  ControlOption,
  ControlUIDirection,
  ControlUISize,
  ControlValue,
} from '../../control';

interface InputProps
  extends OmitOf<WrapperProps<HTMLInputElement>, 'onChange'> {
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface IRadioRef {
  input: HTMLInputElement;
}

export interface IRadioState {
  /**
   * If true, the component is checked.
   */
  checked?: boolean;
  defaultChecked?: boolean;
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value?: ControlValue | ControlOption['value'];
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * @internal
   * The value from the RadioGroup component.
   */
  direction: ControlUIDirection;
  /**
   * @default 'outlined'
   */
  variant: 'filled' | 'bordered';
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 是否只读
   */
  readOnly: boolean;
}

interface IRender<P = PlainObject, E = unknown> {
  (props: P, state: IRadioState & E): React.ReactNode;
}

export type IRadioRootRender = IRender<
  WrapperProps<HTMLSpanElement> & {
    radio: React.ReactNode;
    label: React.ReactNode;
  }
>;

export type IRadioRender = IRender<
  HTMLMotionProps<'i'> & { input: React.ReactNode }
>;

export type IRadioInputRender = IRender<
  InputProps & {
    ref: React.RefObject<HTMLInputElement>;
  },
  IRadioState
>;

export interface IRadioProps extends Partial<IRadioState>, InputProps {
  /**
   * The label element at the end the radio.
   */
  label?: React.ReactNode;

  render?: {
    /**
     * The icon to display when the component is checked.
     */
    radio?: IRadioRender;

    input?: IRadioInputRender;

    root?: IRadioRootRender;
  };
}
