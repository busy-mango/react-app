// ┌────────────────────────────── Warning ──────────────────────────────┐
// │ These PropTypes are generated from the TypeScript type definitions. │
// │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
// └─────────────────────────────────────────────────────────────────────┘

import type { HTMLMotionProps } from 'framer-motion';

import type { ReactRender } from '@/models';

import type { ControlUISize } from '../../control';
import type { ISVGWrapProps } from '../../svg-wrap';

export interface IChipState {
  closeable?: boolean;
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
  /** @default 'medium' */
  size?: ControlUISize;
  /** @default 'outlined' */
  variant?: 'filled' | 'outlined';
  /** show loading icon */
  isLoading?: boolean;
}

export type IChipCloseFunc = (event: React.UIEvent<HTMLElement>) => void;

export type IChipPrefixRender = ReactRender<
  ISVGWrapProps & {
    icon?: React.ReactNode;
    onClose: IChipCloseFunc;
  },
  IChipState
>;

export type IChipSuffixRender = ReactRender<
  ISVGWrapProps & {
    icon?: React.ReactNode;
    onClose: IChipCloseFunc;
  },
  IChipState
>;

export interface IChipRenders {
  prefix?: IChipPrefixRender;
  suffix?: IChipSuffixRender;
}

export interface IChipProps extends IChipState, HTMLMotionProps<'span'> {
  /** Prefix icon element */
  icon?: React.ReactNode;
  render?: IChipRenders;
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onClose?: IChipCloseFunc;
}
