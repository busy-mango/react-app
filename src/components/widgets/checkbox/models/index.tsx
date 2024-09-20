// ┌────────────────────────────── Warning ──────────────────────────────┐
// │ These PropTypes are generated from the TypeScript type definitions. │
// │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
// └─────────────────────────────────────────────────────────────────────┘

import type { HTMLMotionProps, SVGMotionProps } from 'framer-motion';

import type { PlainObject } from '@busymango/is-esm';
import type { OmitOf } from '@busymango/utils';

import type { ReactInputProps, ReactWrapProps } from '@/models';

import type {
  ControlPattern,
  ControlUISize,
  ControlUIStatus,
  ControlValue,
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
   * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
   * This prop is useful for composing Checkbox with ListItem component.
   * @default false
   */
  overlay: boolean;
  status: ControlUIStatus;
  pattren: ControlPattern;
}

interface IRender<P = PlainObject, E = unknown> {
  (props: P, state: CheckboxStatus & E): React.ReactNode;
}

export interface ICheckboxRef {
  root?: HTMLDivElement;
  input?: HTMLInputElement;
}

export interface ICheckboxInputProps
  extends OmitOf<ReactInputProps, 'value' | 'size'> {
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

export type ICheckRootRender = IRender<
  {
    label: React.ReactNode;
    checkbox: React.ReactNode;
    ref: React.RefObject<HTMLDivElement>;
  } & ReactWrapProps
>;

export type ICheckBoxRender = IRender<
  {
    icon?: React.ReactNode;
    input?: React.ReactNode;
  } & HTMLMotionProps<'i'>
>;

export type ICheckInputRender = IRender<
  ICheckboxInputProps & {
    wave?: boolean;
    ref: React.RefObject<HTMLInputElement>;
  }
>;

export type ICheckIconRender = IRender<SVGMotionProps<SVGSVGElement>>;

export interface ICheckboxProps
  extends ICheckboxInputProps,
    Partial<CheckboxStatus> {
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * If false, the ripple effect is disabled.
   */
  wave?: boolean;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  render?: {
    /**
     * The icon to display when the component is `checked`.
     * The icon to display when the component is indeterminate.
     * The checked icon is removed and the selected variant is applied on the `action` element instead.
     */
    icon?: ICheckIconRender;
    root?: ICheckRootRender;
    input?: ICheckInputRender;
    checkbox?: ICheckBoxRender;
  };
}
