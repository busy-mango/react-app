// ┌────────────────────────────── Warning ──────────────────────────────┐
// │ These PropTypes are generated from the TypeScript type definitions. │
// │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
// └─────────────────────────────────────────────────────────────────────┘

import type { WrapperProps } from '@/models';

import type { ControlUISize } from '../../control';

export interface IChipProps extends WrapperProps<HTMLSpanElement> {
  close?: React.ReactNode;
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable?: boolean;
  /** @default false */
  disabled?: boolean;

  /** Icon element */
  icon?: React.ReactNode;
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onClose?: (event: React.UIEvent) => void;
  /** @default 'medium' */
  size?: ControlUISize;
  /** @default 'outlined' */
  variant?: 'filled' | 'outlined';
  /** show loading icon */
  isLoading?: boolean;
}
