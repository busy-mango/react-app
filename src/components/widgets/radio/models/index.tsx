import type { HTMLMotionProps } from 'framer-motion';

import type { PlainObject } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';

import type { WrapperProps } from '@/models';

import type { ControlOption, ControlUISize, ControlValue } from '../../control';

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
   * 是否选中
   */
  checked?: boolean;
  /**
   * 默认是否选中
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   */
  disabled: boolean;
  /**
   * 是否只读
   */
  readOnly: boolean;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * input标签的value
   */
  value?: ControlValue | ControlOption['value'];
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

export type IRadioRadioRender = IRender<
  HTMLMotionProps<'i'> & { input: React.ReactNode }
>;

export type IRadioInputRender = IRender<
  InputProps & {
    ref: React.RefObject<HTMLInputElement>;
  },
  IRadioState
>;

type IRadioRenders = {
  root?: IRadioRootRender;
  radio?: IRadioRadioRender;
  input?: IRadioInputRender;
};

export interface IRadioProps extends Partial<IRadioState>, InputProps {
  /**
   * The label element at the end the radio.
   */
  label?: React.ReactNode;
  /**
   * The label element at the end the radio.
   */
  render?: IRadioRenders;
}
