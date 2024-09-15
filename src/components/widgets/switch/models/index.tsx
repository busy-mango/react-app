// ┌────────────────────────────── Warning ──────────────────────────────┐
// │ These PropTypes are generated from the TypeScript type definitions. │
// │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
// └─────────────────────────────────────────────────────────────────────┘

import type { HTMLMotionProps } from 'framer-motion';

import type { PlainObject } from '@busymango/is-esm';

import type { WrapperProps } from '@/models';

import type {
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
  ControlValue,
} from '../../control';

interface ISwitchStatus {
  /**
   * 指定当前是否选中
   */
  checked: boolean;
  /**
   * 控制控件是否加载中。
   */
  isLoading: boolean;
  /**
   * 控制控件的交互方式。
   * @default 'success'
   */
  pattren: ControlPattern;
  /**
   * 控制控件的尺寸大小
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * 控制控件的校验状态。
   * @default 'success'
   */
  status: ControlUIStatus;
}

interface IRender<P = PlainObject, E = unknown> {
  (props: P, state: ISwitchStatus & E): React.ReactNode;
}

export interface ISwitchRef {
  root?: HTMLDivElement;
  input?: HTMLInputElement;
}

export type ISwitchRootRender = IRender<
  WrapperProps & {
    thumb?: React.ReactNode;
    input?: React.ReactNode;
    label?: React.ReactNode;
    ref: React.RefObject<HTMLDivElement>;
  }
>;

export type ISwitchIconRender = IRender;

export type ISwitchThumbRender = IRender<
  {
    icon?: React.ReactNode;
  } & HTMLMotionProps<'div'>
>;

export type ISwitchInputRender = IRender<
  ISwitchInputProps & {
    ref: React.RefObject<HTMLInputElement>;
  }
>;

export type ISwitchLabelRender = IRender<WrapperProps>;

export interface ISwitchInputProps extends WrapperProps<HTMLInputElement> {
  /**
   * The `name` attribute of the input.
   */
  name?: string;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: ControlValue;
}

type ISwitchRenders = {
  icon?: ISwitchIconRender;
  root?: ISwitchRootRender;
  input?: ISwitchInputRender;
  label?: ISwitchLabelRender;
  thumb?: ISwitchThumbRender;
};

export interface ISwitchProps
  extends ISwitchInputProps,
    Partial<ISwitchStatus> {
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  render?: ISwitchRenders;
}
