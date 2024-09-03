// ┌────────────────────────────── Warning ──────────────────────────────┐
// │ These PropTypes are generated from the TypeScript type definitions. │
// │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
// └─────────────────────────────────────────────────────────────────────┘

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
   * If `true`, the component is checked.
   */
  checked: boolean;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * @default 'outlined'
   */
  variant: 'outlined' | 'plain' | 'soft' | 'solid';
  status: ControlUIStatus;
  pattren: ControlPattern;
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
    icon?: React.ReactNode;
    input?: React.ReactNode;
    label?: React.ReactNode;
    ref: React.RefObject<HTMLDivElement>;
  }
>;

export type ISwitchIconRender = IRender;

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
  render?: {
    icon?: ISwitchIconRender;
    root?: ISwitchRootRender;
    input?: ISwitchInputRender;
    label?: ISwitchLabelRender;
  };
}
