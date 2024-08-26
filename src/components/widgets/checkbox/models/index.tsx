// ┌────────────────────────────── Warning ──────────────────────────────┐
// │ These PropTypes are generated from the TypeScript type definitions. │
// │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
// └─────────────────────────────────────────────────────────────────────┘

import type { FocusEventHandler } from 'react';

import type { OmitOf } from '@busymango/utils';

import type { WrapperProps } from '@/models';

import type {
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
} from '../../control';

interface CheckboxStatus {
  label?: React.ReactNode;
  /**
   * If `true`, the component is checked.
   */
  checked: boolean;
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: boolean;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: ControlUISize;
  /**
   * @default 'outlined'
   */
  variant: 'outlined' | 'plain' | 'soft' | 'solid';
  /**
   * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
   * This prop is useful for composing Checkbox with ListItem component.
   * @default false
   */
  overlay: boolean;
  status: ControlUIStatus;
  pattren: ControlPattern;
}

export interface SlotRender<T = unknown> {
  (props: T & CheckboxStatus & { className?: string }): React.ReactNode;
}

export type ICheckBoxRender = SlotRender<{
  input?: React.ReactNode;
  icon?: React.ReactNode;
}>;

export type CheckRootRender = SlotRender<{
  ref: React.RefObject<HTMLDivElement>;
  checkbox?: React.ReactNode;
  chilren?: React.ReactNode;
}>;

export type CheckInputRender = SlotRender<
  ICheckboxInputProps & {
    wave?: boolean;
    ref: React.RefObject<HTMLInputElement>;
  }
>;

export interface IconRender {
  (status: CheckboxStatus): React.ReactNode;
}

export interface CheckboxRef {
  root?: HTMLDivElement;
  input?: HTMLInputElement;
}

export interface ICheckboxInputProps
  extends OmitOf<WrapperProps<HTMLInputElement>, 'onChange'> {
  /**
   * The `name` attribute of the input.
   */
  name?: string;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (value?: boolean) => void;
  // /**
  //  * @ignore
  //  */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  // /**
  //  * @ignore
  //  */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: string[] | string | number;
}

export interface ICheckboxProps
  extends ICheckboxInputProps,
    Partial<CheckboxStatus> {
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * The icon to display when the component is `checked`.
   * The icon to display when the component is indeterminate.
   * The checked icon is removed and the selected variant is applied on the `action` element instead.
   */
  icon?: IconRender;
  /**
   * If false, the ripple effect is disabled.
   */
  wave?: boolean;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  render?: {
    checkbox?: ICheckBoxRender;
    input?: CheckInputRender;
    root?: CheckRootRender;
  };
}
